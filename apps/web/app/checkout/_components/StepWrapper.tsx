import type { FormEventHandler, PropsWithChildren } from 'react';

import { Surface, Heading, Text } from '../../../components/ui';
import { StepControls } from './StepControls';

interface StepWrapperProps extends PropsWithChildren {
  title: string;
  description: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const StepWrapper = ({ title, description, children, onSubmit }: StepWrapperProps) => {
  const content = (
    <div className="relative mx-4 my-24">
      <Surface>
        <Heading>{title}</Heading>
        <Text variant="secondary" className="mt-2">
          {description}
        </Text>
        <div className="mt-6">{children}</div>
      </Surface>
    </div>
  );

  return onSubmit ? (
    <form onSubmit={onSubmit}>
      {content}
      <StepControls />
    </form>
  ) : (
    content
  );
};
