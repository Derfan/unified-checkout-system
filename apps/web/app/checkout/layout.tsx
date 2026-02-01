import { Metadata } from 'next';
import { CheckoutProvider } from '@repo/logic/react';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Checkout process for the unified checkout system',
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
