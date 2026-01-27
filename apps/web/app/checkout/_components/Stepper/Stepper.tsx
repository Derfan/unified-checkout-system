import { StepCircle } from './StepCircle';

const STEPS = [
  { id: 'personal-details', label: 'Your Information' },
  { id: 'shipping-address', label: 'Shipping Address' },
  { id: 'payment-details', label: 'Payment Details' },
  { id: 'confirmation', label: 'Summary' },
];

interface StepperProps {
  className?: string;
}

export const Stepper = ({ className }: StepperProps) => {
  const activeStepIndex = 1; // Example: hardcoded active step index

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
            <StepCircle stepNumber={idx + 1} status={getStepStatus(idx)} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
