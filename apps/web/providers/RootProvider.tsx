import { CheckoutProvider } from './CheckoutProvider';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return <CheckoutProvider>{children}</CheckoutProvider>;
};
