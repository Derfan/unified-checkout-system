import { Button } from '../../../components/ui';

interface StepControlsProps {
  nextLabel?: string;
  onBack?: () => void;
}

export const StepControls = ({ nextLabel = 'Next Step', onBack }: StepControlsProps) => {
  const canGoBack = true; // Placeholder for actual logic

  return (
    <div className="flex justify-between p-4 bg-white shadow-sm">
      {canGoBack ? (
        <Button variant="tertiary" onClick={onBack}>
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
