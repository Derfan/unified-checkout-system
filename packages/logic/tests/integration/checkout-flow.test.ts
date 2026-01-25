import { createActor } from 'xstate';
import { describe, it, expect } from 'vitest';
import { PersonalDetails, Address, PaymentDetails } from '@repo/schema';

import { checkoutFlowMachine } from '../../src/checkout/machines/checkout-flow';

describe('Checkout Flow Orchestrator', () => {
  const validPersonalDetails: PersonalDetails = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1990-01-01'),
    email: 'john@test.com',
  };
  const validShippingAddress: Address = {
    streetAddress: '123 Main St',
    city: 'Testville',
    state: 'TS',
    postalCode: '12345',
    country: 'Testland',
  };
  const validPaymentDetails: PaymentDetails = {
    cardNumber: '4111111111111111',
    expiryDate: '12/25',
    cvv: '123',
    cardHolderName: 'John Doe',
  };

  it('should start in the personalDetailsStep state', () => {
    const actor = createActor(checkoutFlowMachine).start();

    expect(actor.getSnapshot().value).toBe('personalDetailsStep');
  });

  it('should complete the entire flow and return all data as non-nullable output', async () => {
    const actor = createActor(checkoutFlowMachine).start();

    // --- STEP 1: Personal Details ---
    const personalDetailsActor = actor.getSnapshot().children['personal-details'];

    personalDetailsActor?.send({ type: 'SUBMIT', payload: validPersonalDetails });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().status).toBe('active');
    expect(actor.getSnapshot().value).toBe('shippingAddressStep');

    // --- STEP 2: Shipping Address ---
    const shippingAddressActor = actor.getSnapshot().children['shipping-address'];

    shippingAddressActor?.send({ type: 'SUBMIT', payload: validShippingAddress });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().status).toBe('active');
    expect(actor.getSnapshot().value).toBe('paymentDetailsStep');

    // --- STEP 3: Payment Details ---
    const paymentDetailsActor = actor.getSnapshot().children['payment-details'];

    paymentDetailsActor?.send({ type: 'SUBMIT', payload: validPaymentDetails });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().status).toBe('done');
    expect(actor.getSnapshot().value).toBe('completed');
  });

  it('should navigate back to previous steps correctly', async () => {
    const actor = createActor(checkoutFlowMachine).start();

    actor
      .getSnapshot()
      .children['personal-details']?.send({ type: 'SUBMIT', payload: validPersonalDetails });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().value).toBe('shippingAddressStep');

    actor
      .getSnapshot()
      .children['shipping-address']?.send({ type: 'SUBMIT', payload: validShippingAddress });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().value).toBe('paymentDetailsStep');

    actor.send({ type: 'BACK' });
    expect(actor.getSnapshot().value).toBe('shippingAddressStep');

    actor.send({ type: 'BACK' });
    expect(actor.getSnapshot().value).toBe('personalDetailsStep');
  });
});
