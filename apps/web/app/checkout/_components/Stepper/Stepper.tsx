'use client';

import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState, useCheckoutNavigation } from '@repo/logic/react';
import { StepCircle } from './StepCircle';

const STEPS = [
  { id: CheckoutFlowStates.PersonalDetailsStep, label: 'Your Info' },
  { id: CheckoutFlowStates.ShippingAddressStep, label: 'Address' },
  { id: CheckoutFlowStates.PaymentDetailsStep, label: 'Payment' },
  { id: CheckoutFlowStates.ConfirmationStep, label: 'Summary' },
];

export const Stepper = () => {
  const { currentStep } = useCheckoutState();
  const { goToStep } = useCheckoutNavigation();

  const activeStepIndex = STEPS.findIndex((step) => currentStep === step.id);

  const getStepStatus = (index: number) => {
    if (index < activeStepIndex) return 'completed';

    if (index === activeStepIndex) return 'active';

    return 'upcoming';
  };

  return (
    <ul className="flex justify-center gap-x-4 md:flex-col md:justify-start md:gap-y-8">
      {STEPS.map((step, idx) => (
        <li key={step.id} className="flex md:cursor-pointer">
          <StepCircle
            stepNumber={idx + 1}
            status={getStepStatus(idx)}
            onClick={() => goToStep(step.id)}
          />

          <div className="sr-only md:not-sr-only md:ml-4">
            <span className="md:block md:text-sm md:font-medium md:text-white">Step {idx + 1}</span>
            <span className="md:block md:text-sm md:font-medium md:text-white">{step.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
