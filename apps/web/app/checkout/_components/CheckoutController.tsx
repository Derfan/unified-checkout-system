'use client';

import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState } from '@repo/logic/react';

import { StepLayout } from './StepLayout';
import { Stepper } from './Stepper';
import { StepControls } from './StepControls';

import {
  PersonalInfoStep,
  ShippingAddressStep,
  PaymentDetailsStep,
  ConfirmationStep,
  CompletedStep,
} from './steps';

const StateToComponentMap: Record<CheckoutFlowStates, React.FC> = {
  [CheckoutFlowStates.PersonalDetailsStep]: PersonalInfoStep,
  [CheckoutFlowStates.ShippingAddressStep]: ShippingAddressStep,
  [CheckoutFlowStates.PaymentDetailsStep]: PaymentDetailsStep,
  [CheckoutFlowStates.ConfirmationStep]: ConfirmationStep,
  [CheckoutFlowStates.Completed]: CompletedStep,
};

export const CheckoutController = () => {
  const { currentStep } = useCheckoutState();
  const StepComponent = StateToComponentMap[currentStep];

  return (
    <StepLayout
      stepper={<Stepper />}
      content={<StepComponent />}
      controls={currentStep !== CheckoutFlowStates.Completed ? <StepControls /> : null}
    />
  );
};
