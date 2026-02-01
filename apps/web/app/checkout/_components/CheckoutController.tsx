'use client';

import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState } from '@repo/logic/react';

import {
  PersonalInfoStep,
  ShippingAddressStep,
  PaymentDetailsStep,
  ConfirmationStep,
  CompletedStep,
} from './steps';

export const CheckoutController = () => {
  const { currentStep } = useCheckoutState();

  switch (currentStep) {
    case CheckoutFlowStates.PersonalDetailsStep:
      return <PersonalInfoStep />;
    case CheckoutFlowStates.ShippingAddressStep:
      return <ShippingAddressStep />;
    case CheckoutFlowStates.PaymentDetailsStep:
      return <PaymentDetailsStep />;
    case CheckoutFlowStates.ConfirmationStep:
      return <ConfirmationStep />;
    case CheckoutFlowStates.Completed:
      return <CompletedStep />;
    default:
      return null;
  }
};
