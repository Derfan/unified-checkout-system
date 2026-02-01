import type { FormEventHandler, PropsWithChildren } from 'react';

import { Surface, Heading, Text } from '../../../components/ui';
import { StepControls } from './StepControls';

interface StepWrapperProps extends PropsWithChildren {
  title?: string;
  description?: string;
  className?: string;
  submitting?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const StepWrapper = ({
  children,
  title = '',
  description = '',
  className = '',
  submitting = false,
  onSubmit,
}: StepWrapperProps) => {
  const content = (
    <div className="relative mx-4 my-24">
      <Surface className={className}>
        {title && <Heading>{title}</Heading>}
        {description && (
          <Text variant="secondary" className="mt-2 mb-4">
            {description}
          </Text>
        )}
        {children}
      </Surface>
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
