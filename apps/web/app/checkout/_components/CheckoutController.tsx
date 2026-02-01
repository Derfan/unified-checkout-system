'use client';

import { CheckoutFlowStates } from '@repo/logic';

import { useCheckoutSelector } from '../../../hooks/checkout';
import {
  PersonalInfoStep,
  ShippingAddressStep,
  PaymentDetailsStep,
  ConfirmationStep,
  CompletedStep,
} from './steps';

export const CheckoutController = () => {
  const checkoutState = useCheckoutSelector((state) => state);

  const renderStep = () => {
    if (checkoutState.matches(CheckoutFlowStates.PersonalDetailsStep)) return <PersonalInfoStep />;
    if (checkoutState.matches(CheckoutFlowStates.ShippingAddressStep))
      return <ShippingAddressStep />;
    if (checkoutState.matches(CheckoutFlowStates.PaymentDetailsStep)) return <PaymentDetailsStep />;
    if (checkoutState.matches(CheckoutFlowStates.ConfirmationStep)) return <ConfirmationStep />;
    if (checkoutState.matches(CheckoutFlowStates.Completed)) return <CompletedStep />;
  };

  return renderStep();
};
