import { createActor } from 'xstate';
import { describe, it, expect, vi } from 'vitest';
import { PersonalDetails, Address, PaymentDetails } from '@repo/schema';

import { checkoutFlowMachine } from '../../src/checkout/machines/checkout-flow';

// Mock API services to return instantly without delays
vi.mock('../../src/checkout/actors/api-services', () => ({
  savePersonalDetails: vi.fn((data: PersonalDetails) => Promise.resolve(data)),
  saveShippingAddress: vi.fn((data: Address) => Promise.resolve(data)),
  savePaymentDetails: vi.fn((data: PaymentDetails) => Promise.resolve(data)),
}));

describe('Checkout Flow Orchestrator', () => {
  const validPersonalDetails: PersonalDetails = {
    title: 'mr',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    email: 'john@test.com',
    phoneNumber: '+1234567890',
  };
  const validShippingAddress: Address = {
    street: 'Main Street',
    houseNumber: '123',
    city: 'Testville',
    postalCode: '12345',
    country: 'Testland',
  };
  const validPaymentDetails: PaymentDetails = {
    cardNumber: '4111111111111111',
    expiryDate: '12/28',
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
    expect(actor.getSnapshot().context.personalDetailsData).toEqual(validPersonalDetails);

    // --- STEP 2: Shipping Address ---
    const shippingAddressActor = actor.getSnapshot().children['shipping-address'];

    shippingAddressActor?.send({ type: 'SUBMIT', payload: validShippingAddress });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().status).toBe('active');
    expect(actor.getSnapshot().value).toBe('paymentDetailsStep');
    expect(actor.getSnapshot().context.shippingAddressData).toEqual(validShippingAddress);

    // --- STEP 3: Payment Details ---
    const paymentDetailsActor = actor.getSnapshot().children['payment-details'];

    paymentDetailsActor?.send({ type: 'SUBMIT', payload: validPaymentDetails });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().status).toBe('active');
    expect(actor.getSnapshot().value).toBe('confirmationStep');
    expect(actor.getSnapshot().context.paymentDetailsData).toEqual(validPaymentDetails);

    // --- STEP 4: Confirmation ---
    actor.send({ type: 'SUBMIT' });

    expect(actor.getSnapshot().status).toBe('done');
    expect(actor.getSnapshot().value).toBe('completed');
    expect(actor.getSnapshot().output).toEqual({
      personalDetailsData: validPersonalDetails,
      shippingAddressData: validShippingAddress,
      paymentDetailsData: validPaymentDetails,
    });
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
