import { Metadata } from 'next';
import { RootProvider } from '../../providers/RootProvider';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Checkout process for the unified checkout system',
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootProvider>{children}</RootProvider>;
}
