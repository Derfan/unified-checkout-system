import type {
  PersonalDetailsActorRef,
  ShippingAddressActorRef,
  PaymentDetailsActorRef,
} from '../../../core';
import { useCheckoutSelector } from './useCheckout';

export type StepActorRef =
  | PersonalDetailsActorRef
  | ShippingAddressActorRef
  | PaymentDetailsActorRef;

export type StepActorRefMap = {
  'personal-details': PersonalDetailsActorRef;
  'shipping-address': ShippingAddressActorRef;
  'payment-details': PaymentDetailsActorRef;
};

export const useCheckoutChildActorRef = <TStepId extends keyof StepActorRefMap>(
  stepId: TStepId,
): StepActorRefMap[TStepId] | undefined => {
  return useCheckoutSelector((state) => state.children[stepId]) as
    | StepActorRefMap[TStepId]
    | undefined;
};
