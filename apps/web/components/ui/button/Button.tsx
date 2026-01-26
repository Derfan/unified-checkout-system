import { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<{
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
}>;

const cns = {
  primary:
    'bg-blue-950 text-white font-bold px-4 py-2 rounded transition-colors active:bg-blue-700',
  secondary:
    'bg-purple-600 text-white font-bold px-4 py-2 rounded transition-colors active:bg-purple-400',
  tertiary:
    'text-gray-500 font-bold px-4 py-2 rounded transition-colors active:bg-gray-200 active:text-gray-700',
};

export const Button = ({
  type = 'button',
  variant = 'primary',
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button type={type} className={cns[variant]} onClick={onClick}>
      {children}
    </button>
  );
};
