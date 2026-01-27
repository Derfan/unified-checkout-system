import type { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

import { Text, type TextProps } from '../../ui';

export interface ErrorMessageProps
  extends PropsWithChildren, TextProps, VariantProps<typeof errorMessageVariants> {}

/**
 * A component to display error messages in forms.
 * @param children - The error message content.
 * @param props - Additional text HTML attributes and variant props.
 * @returns A styled error message element.
 */
export const ErrorMessage = ({ children, className, ...props }: ErrorMessageProps) => {
  return (
    <Text className={cn(errorMessageVariants({ className }))} {...props}>
      {children}
    </Text>
  );
};

const errorMessageVariants = cva('text-red-700', {
  variants: {},
  defaultVariants: {},
});
