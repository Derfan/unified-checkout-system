import { CheckoutFlowStates } from '@repo/logic';

import { useCheckoutSelector, useCheckoutActorRef } from '../../../hooks/checkout';
import { Button } from '../../../components/ui';
import { useCallback } from 'react';

interface StepControlsProps {
  nextLabel?: string;
  submitting?: boolean;
  onBack?: () => void;
  onNext?: () => void;
}

export const StepControls = ({
  nextLabel = 'Next Step',
  submitting = false,
  onBack,
  onNext,
}: StepControlsProps) => {
  const state = useCheckoutSelector((state) => state);
  const { send } = useCheckoutActorRef();

  const shouldShowBackButton = !state.matches(CheckoutFlowStates.PersonalDetailsStep);

  const handleBack = useCallback(() => {
    onBack?.();
    send({ type: 'BACK' });
  }, [onBack, send]);

  return (
    <div className="flex justify-between p-4 bg-white shadow-sm fixed bottom-0 left-0 right-0">
      {shouldShowBackButton ? (
        <Button variant="tertiary" disabled={submitting} onClick={handleBack}>
          Go Back
        </Button>
      ) : (
        <div /> // Spacer to keep "Next" on the right
      )}

      <Button type="submit" variant="primary" disabled={submitting} onClick={onNext}>
        {submitting ? 'Submitting...' : nextLabel}
      </Button>
    </div>
  );
};
