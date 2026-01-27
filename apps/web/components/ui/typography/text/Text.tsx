import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../../styles/utils';

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {}

export const Text = ({ size, align, className, ...props }: TextProps) => {
  return <p className={cn(textVariants({ size, align, className }))} {...props} />;
};

const textVariants = cva('text-blue-900', {
  variants: {
    size: {
      sm: 'text-sm md:text-base',
      md: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'left',
  },
});
