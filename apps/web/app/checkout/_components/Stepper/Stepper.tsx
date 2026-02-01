'use client';

import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState, useCheckoutNavigation } from '@repo/logic/react';
import { StepCircle } from './StepCircle';

const STEPS = [
  { id: CheckoutFlowStates.PersonalDetailsStep, label: 'Your Information' },
  { id: CheckoutFlowStates.ShippingAddressStep, label: 'Shipping Address' },
  { id: CheckoutFlowStates.PaymentDetailsStep, label: 'Payment Details' },
  { id: CheckoutFlowStates.ConfirmationStep, label: 'Summary' },
];

interface StepperProps {
  className?: string;
}

export const Stepper = ({ className }: StepperProps) => {
  const { currentStep } = useCheckoutState();
  const { goToStep } = useCheckoutNavigation();

  const activeStepIndex = STEPS.findIndex((step) => currentStep === step.id);

  const getStepStatus = (index: number) => {
    if (index < activeStepIndex) return 'completed';

    if (index === activeStepIndex) return 'active';

    return 'upcoming';
  };

  return (
    <nav aria-label="Progress" className={className}>
      <ul className="flex items-center justify-center gap-x-4">
        {STEPS.map((step, idx) => (
          <li key={step.id}>
            <StepCircle
              stepNumber={idx + 1}
              status={getStepStatus(idx)}
              onClick={() => goToStep(step.id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
