import type { LabelHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

/**
 * A customizable label component for form fields.
 * @param props - Label HTML attributes and variant props.
 * @returns A styled label element.
 */
export const Label = ({ className, ...props }: LabelProps) => {
  return <label className={cn(labelVariants({ className }))} {...props} />;
};

const labelVariants = cva('text-sm', {
  variants: {},
  defaultVariants: {},
});
