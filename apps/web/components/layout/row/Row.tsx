import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof rowVariants> {
  children: React.ReactNode;
}

/**
 * Row component that arranges its children in a horizontal layout.
 * @param props - HTML attributes and variant props.
 * @returns A div element with row layout.
 */
export const Row = ({ children, space, className, ...props }: RowProps) => {
  return (
    <div className={cn(rowVariants({ space, className }))} {...props}>
      {children}
    </div>
  );
};

const rowVariants = cva('flex', {
  variants: {
    space: {
      sm: 'gap-x-2',
      md: 'gap-x-4',
      lg: 'gap-x-6',
    },
  },
  defaultVariants: {
    space: 'md',
  },
});
