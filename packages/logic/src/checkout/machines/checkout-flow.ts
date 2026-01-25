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

export const checkoutFlowMachine = setup({
  types: {} as {
    context: CheckoutFlowContext;
    event: CheckoutFlowEvent;
    output: CheckoutFlowOutput;
  },
  actors: {
    personalDetailsStep: personalDetailsMachine,
    shippingAddressStep: shippingAddressMachine,
    paymentDetailsStep: paymentDetailsMachine,
  },
}).createMachine({
  id: 'checkout-flow',
  context: {
    personalDetails: null,
    shippingAddress: null,
    paymentDetails: null,
  },
  initial: 'personalDetailsStep',
  states: {
    personalDetailsStep: {
      invoke: {
        id: personalDetailsMachine.id,
        src: 'personalDetailsStep',
        input: ({ context }) => ({ initialData: context.personalDetails }),
        onDone: {
          target: 'shippingAddressStep',
          actions: assign({
            personalDetails: ({ event }) => event.output,
          }),
        },
      },
    },
    shippingAddressStep: {
      on: {
        BACK: 'personalDetailsStep',
      },
      invoke: {
        id: shippingAddressMachine.id,
        src: 'shippingAddressStep',
        input: ({ context }) => ({ initialData: context.shippingAddress }),
        onDone: {
          target: 'paymentDetailsStep',
          actions: assign({
            shippingAddress: ({ event }) => event.output,
          }),
        },
      },
    },
    paymentDetailsStep: {
      on: {
        BACK: 'shippingAddressStep',
      },
      invoke: {
        id: paymentDetailsMachine.id,
        src: 'paymentDetailsStep',
        input: ({ context }) => ({ initialData: context.paymentDetails }),
        onDone: {
          target: 'completed',
          actions: assign({
            paymentDetails: ({ event }) => event.output,
          }),
        },
      },
    },
    completed: {
      type: 'final',
      output: ({ context }) => context,
    },
  },
});
