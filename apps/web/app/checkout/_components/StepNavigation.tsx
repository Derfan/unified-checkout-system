import { Button } from '../../../components/ui';

interface StepNavigationProps {
  nextLabel?: string;
}

export const StepNavigation = ({ nextLabel = 'Next Step' }: StepNavigationProps) => {
  const canGoBack = true; // Placeholder for actual logic

  return (
    <div className="flex justify-between p-4 bg-white shadow-sm">
      {canGoBack ? (
        <Button variant="tertiary">Go Back</Button>
      ) : (
        <div /> // Spacer to keep "Next" on the right
      )}

      <Button variant="primary">{nextLabel}</Button>
    </div>
  );
};
