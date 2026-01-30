import { setup, assign } from 'xstate';
import type { OutputFrom } from 'xstate';

import { personalDetailsMachine } from './steps/personal-details';
import { shippingAddressMachine } from './steps/shipping-address';
import { paymentDetailsMachine } from './steps/payment-details';

// TODO: Move to a shared utilities package
type DeepNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export enum CheckoutFlowStates {
  PersonalDetailsStep = 'personalDetailsStep',
  ShippingAddressStep = 'shippingAddressStep',
  PaymentDetailsStep = 'paymentDetailsStep',
  ConfirmationStep = 'confirmationStep',
  Completed = 'completed',
}

type CheckoutFlowContext = {
  personalDetailsData: OutputFrom<typeof personalDetailsMachine> | null;
  shippingAddressData: OutputFrom<typeof shippingAddressMachine> | null;
  paymentDetailsData: OutputFrom<typeof paymentDetailsMachine> | null;
};

type CheckoutFlowEvent = { type: 'BACK' } | { type: 'GO_TO_STEP'; payload: CheckoutFlowStates };

type CheckoutFlowOutput = DeepNonNullable<CheckoutFlowContext>;

export const checkoutFlowMachine = setup({
  types: {} as {
    context: CheckoutFlowContext;
    event: CheckoutFlowEvent;
    output: CheckoutFlowOutput;
  },
  actors: {
    personalDetailsMachine,
    shippingAddressMachine,
    paymentDetailsMachine,
  },
}).createMachine({
  id: 'checkout-flow',
  context: {
    personalDetailsData: null,
    shippingAddressData: null,
    paymentDetailsData: null,
  },
  initial: CheckoutFlowStates.PersonalDetailsStep,
  states: {
    [CheckoutFlowStates.PersonalDetailsStep]: {
      invoke: {
        id: personalDetailsMachine.id,
        src: 'personalDetailsMachine',
        input: ({ context }) => ({ initialData: context.personalDetailsData }),
        onDone: {
          target: CheckoutFlowStates.ShippingAddressStep,
          actions: assign({
            personalDetailsData: ({ event }) => event.output,
          }),
        },
      },
    },
    [CheckoutFlowStates.ShippingAddressStep]: {
      on: {
        BACK: CheckoutFlowStates.PersonalDetailsStep,
        GO_TO_STEP: [
          {
            guard: ({ event }) => event.payload === CheckoutFlowStates.PersonalDetailsStep,
            target: CheckoutFlowStates.PersonalDetailsStep,
          },
        ],
      },
      invoke: {
        id: shippingAddressMachine.id,
        src: 'shippingAddressMachine',
        input: ({ context }) => ({ initialData: context.shippingAddressData }),
        onDone: {
          target: CheckoutFlowStates.PaymentDetailsStep,
          actions: assign({
            shippingAddressData: ({ event }) => event.output,
          }),
        },
      },
    },
    [CheckoutFlowStates.PaymentDetailsStep]: {
      on: {
        BACK: CheckoutFlowStates.ShippingAddressStep,
        GO_TO_STEP: [
          {
            guard: ({ event }) => event.payload === CheckoutFlowStates.PersonalDetailsStep,
            target: CheckoutFlowStates.PersonalDetailsStep,
          },
          {
            guard: ({ event }) => event.payload === CheckoutFlowStates.ShippingAddressStep,
            target: CheckoutFlowStates.ShippingAddressStep,
          },
        ],
      },
      invoke: {
        id: paymentDetailsMachine.id,
        src: 'paymentDetailsMachine',
        input: ({ context }) => ({ initialData: context.paymentDetailsData }),
        onDone: {
          target: CheckoutFlowStates.ConfirmationStep,
          actions: assign({
            paymentDetailsData: ({ event }) => event.output,
          }),
        },
      },
    },
    [CheckoutFlowStates.ConfirmationStep]: {
      on: {
        SUBMIT: CheckoutFlowStates.Completed,
        BACK: CheckoutFlowStates.PaymentDetailsStep,
        GO_TO_STEP: [
          {
            guard: ({ event }) => event.payload === CheckoutFlowStates.PersonalDetailsStep,
            target: CheckoutFlowStates.PersonalDetailsStep,
          },
          {
            guard: ({ event }) => event.payload === CheckoutFlowStates.ShippingAddressStep,
            target: CheckoutFlowStates.ShippingAddressStep,
          },
          {
            guard: ({ event }) => event.payload === CheckoutFlowStates.PaymentDetailsStep,
            target: CheckoutFlowStates.PaymentDetailsStep,
          },
        ],
      },
      output: ({ context }) => context,
    },
    [CheckoutFlowStates.Completed]: {
      type: 'final',
    },
  },
  output: ({ context }) => context as CheckoutFlowOutput,
});
