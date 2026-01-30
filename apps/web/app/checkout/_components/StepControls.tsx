import { CheckoutFlowStates } from '@repo/logic';

import { useCheckoutSelector, useCheckoutActorRef } from '../../../hooks/checkout';
import { Button } from '../../../components/ui';

interface StepControlsProps {
  nextLabel?: string;
}

export const StepControls = ({ nextLabel = 'Next Step' }: StepControlsProps) => {
  const state = useCheckoutSelector((state) => state);
  const actor = useCheckoutActorRef();

  return (
    <div className="flex justify-between p-4 bg-white shadow-sm fixed bottom-0 left-0 right-0">
      {!state.matches(CheckoutFlowStates.PersonalDetailsStep) ? (
        <Button variant="tertiary" onClick={() => actor.send({ type: 'BACK' })}>
          Go Back
        </Button>
      ) : (
        <div /> // Spacer to keep "Next" on the right
      )}

      <Button type="submit" variant="primary">
        {nextLabel}
      </Button>
    </div>
  );
};
