'use client';

import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState, useCheckoutNavigation, useCheckoutStep } from '@repo/logic/react';

import { Button } from '@components/ui';

const stepIds = {
  [CheckoutFlowStates.PersonalDetailsStep]: 'personal-details',
  [CheckoutFlowStates.ShippingAddressStep]: 'shipping-address',
  [CheckoutFlowStates.PaymentDetailsStep]: 'payment-details',
} as const;

type StepWithForm = keyof typeof stepIds;

const isStepWithForm = (step: CheckoutFlowStates): step is StepWithForm => {
  return step in stepIds;
};

export const StepControls = () => {
  const { currentStep } = useCheckoutState();
  const { goBack } = useCheckoutNavigation();

  const stepId = isStepWithForm(currentStep) ? stepIds[currentStep] : null;
  const { state } = useCheckoutStep(stepId ?? 'personal-details');

  const nextLabel =
    currentStep === CheckoutFlowStates.ConfirmationStep ? 'Confirm Order' : 'Next Step';

  return (
    <div className="flex justify-between">
      {currentStep !== CheckoutFlowStates.PersonalDetailsStep ? (
        <Button variant="tertiary" disabled={state.submitting} onClick={goBack}>
          Go Back
        </Button>
      ) : (
        <div /> // Spacer to keep "Next" on the right
      )}

      <Button type="submit" form={currentStep} variant="primary" disabled={state.submitting}>
        {state.submitting ? 'Submitting...' : nextLabel}
      </Button>
    </div>
  );
};
