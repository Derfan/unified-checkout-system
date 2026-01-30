import { setup, assign } from 'xstate';
import type { OutputFrom } from 'xstate';

import { personalDetailsMachine } from './steps/personal-details';
import { shippingAddressMachine } from './steps/shipping-address';
import { paymentDetailsMachine } from './steps/payment-details';

// TODO: Move to a shared utilities package
type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type CheckoutFlowContext = {
  personalDetails: OutputFrom<typeof personalDetailsMachine> | null;
  shippingAddress: OutputFrom<typeof shippingAddressMachine> | null;
  paymentDetails: OutputFrom<typeof paymentDetailsMachine> | null;
};

type CheckoutFlowEvent = { type: 'BACK' };

type CheckoutFlowOutput = DeepNonNullable<CheckoutFlowContext>;

export enum CheckoutFlowStates {
  PersonalDetailsStep = 'personalDetailsStep',
  ShippingAddressStep = 'shippingAddressStep',
  PaymentDetailsStep = 'paymentDetailsStep',
  Completed = 'completed',
}

export const checkoutFlowMachine = setup({
  types: {} as {
    context: CheckoutFlowContext;
    event: CheckoutFlowEvent;
    output: CheckoutFlowOutput;
  },
  actors: {
    [CheckoutFlowStates.PersonalDetailsStep]: personalDetailsMachine,
    [CheckoutFlowStates.ShippingAddressStep]: shippingAddressMachine,
    [CheckoutFlowStates.PaymentDetailsStep]: paymentDetailsMachine,
  },
}).createMachine({
  id: 'checkout-flow',
  context: {
    personalDetails: null,
    shippingAddress: null,
    paymentDetails: null,
  },
  initial: CheckoutFlowStates.PersonalDetailsStep,
  states: {
    [CheckoutFlowStates.PersonalDetailsStep]: {
      invoke: {
        id: personalDetailsMachine.id,
        src: CheckoutFlowStates.PersonalDetailsStep,
        input: ({ context }) => ({ initialData: context.personalDetails }),
        onDone: {
          target: CheckoutFlowStates.ShippingAddressStep,
          actions: assign({
            personalDetails: ({ event }) => event.output,
          }),
        },
      },
    },
    [CheckoutFlowStates.ShippingAddressStep]: {
      on: {
        BACK: CheckoutFlowStates.PersonalDetailsStep,
      },
      invoke: {
        id: shippingAddressMachine.id,
        src: CheckoutFlowStates.ShippingAddressStep,
        input: ({ context }) => ({ initialData: context.shippingAddress }),
        onDone: {
          target: CheckoutFlowStates.PaymentDetailsStep,
          actions: assign({
            shippingAddress: ({ event }) => event.output,
          }),
        },
      },
    },
    [CheckoutFlowStates.PaymentDetailsStep]: {
      on: {
        BACK: CheckoutFlowStates.ShippingAddressStep,
      },
      invoke: {
        id: paymentDetailsMachine.id,
        src: CheckoutFlowStates.PaymentDetailsStep,
        input: ({ context }) => ({ initialData: context.paymentDetails }),
        onDone: {
          target: CheckoutFlowStates.Completed,
          actions: assign({
            paymentDetails: ({ event }) => event.output,
          }),
        },
      },
    },
    [CheckoutFlowStates.Completed]: {
      type: 'final',
      output: ({ context }) => context,
    },
  },
});
