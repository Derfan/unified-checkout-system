import type { FormEventHandler, PropsWithChildren } from 'react';

import { Surface } from '../../../components/ui';
import { StepControls } from './StepControls';

interface StepWrapperProps extends PropsWithChildren {
  className?: string;
  submitting?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const StepWrapper = ({
  children,
  className = '',
  submitting = false,
  onSubmit,
}: StepWrapperProps) => {
  const content = (
    <div className="relative mx-4 my-24">
      <Surface className={className}>{children}</Surface>
    </div>
  );

  return onSubmit ? (
    <form onSubmit={onSubmit}>
      {content}
      <StepControls submitting={submitting} />
    </form>
  ) : (
    content
  );
};
