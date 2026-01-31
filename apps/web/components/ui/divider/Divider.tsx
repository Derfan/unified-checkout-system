import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../styles/utils';

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> {
  label?: string;
}

/**
 * A divider component that can be used to separate content.
 *
 * @param label - Optional label to display in the center of the divider.
 * @param orientation - Orientation of the divider.
 * @param className - Additional class names to apply to the divider.
 *
 * @returns The rendered Divider component.
 */
export const Divider = ({ label, orientation, className, ...props }: DividerProps) => {
  return (
    <div className={cn(dividerVariants({ orientation, className }))} {...props} role="separator">
      <div className="grow border-t border-slate-200" />

      {label && (
        <span className="mx-4 shrink text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      )}

      <div className="grow border-t border-slate-200" />
    </div>
  );
};

const dividerVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'relative flex items-center',
      vertical: 'inline-block w-px self-stretch border-slate-200',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
