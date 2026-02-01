'use client';

import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState, useCheckoutNavigation } from '@repo/logic/react';

import { Button } from '../../../components/ui';

export const StepControls = () => {
  const { currentStep } = useCheckoutState();
  const { goBack } = useCheckoutNavigation();

  const nextLabel =
    currentStep === CheckoutFlowStates.ConfirmationStep ? 'Confirm Order' : 'Next Step';

  return (
    <div className="flex justify-between">
      {currentStep !== CheckoutFlowStates.PersonalDetailsStep ? (
        <Button variant="tertiary" onClick={goBack}>
          Go Back
        </Button>
      ) : (
        <div /> // Spacer to keep "Next" on the right
      )}

      <Button type="submit" form={currentStep} variant="primary">
        {nextLabel}
      </Button>
    </div>
  );
};
