import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../../styles/utils';

interface StepCircleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  stepNumber: number;
}

export const StepCircle = ({ stepNumber, status, size, className, onClick }: StepCircleProps) => {
  return (
    <button
      className={cn(buttonVariants({ status, size, className }))}
      disabled={status === 'upcoming'}
      onClick={onClick}
    >
      {stepNumber}
    </button>
  );
};

const buttonVariants = cva(
  'rounded-full font-bold transition-transform focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      status: {
        completed: 'text-white border border-white active:scale-95',
        active: 'bg-blue-200 text-blue-950',
        upcoming: 'bg-transparent text-white border border-white',
      },
      size: {
        default: 'w-10 h-10',
      },
    },
    defaultVariants: {
      status: 'active',
      size: 'default',
    },
  },
);
