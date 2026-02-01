import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../../styles/utils';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Adaptive Heading component for consistent typography.
 * @param level - The visual size/importance of the heading.
 * @param as - The actual HTML tag used (defaults to level).
 */
export const Heading = ({
  className,
  level,
  align,
  as: Component = level || 'h1',
  ...props
}: HeadingProps) => {
  return <Component className={cn(headingVariants({ level, align, className }))} {...props} />;
};

const headingVariants = cva('font-bold tracking-tight text-blue-950', {
  variants: {
    level: {
      h1: 'text-2xl md:text-3xl lg:text-4xl',
      h2: 'text-xl md:text-2xl',
      h3: 'text-lg md:text-xl',
      h4: 'text-base md:text-lg',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    level: 'h1',
    align: 'left',
  },
});
