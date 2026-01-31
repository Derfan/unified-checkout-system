import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../../styles/utils';

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {}

export const Text = ({ variant, size, align, className, ...props }: TextProps) => {
  return <p className={cn(textVariants({ variant, size, align, className }))} {...props} />;
};

const textVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-blue-950',
      secondary: 'text-gray-500',
    },
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
    variant: 'primary',
    size: 'md',
    align: 'left',
  },
});
