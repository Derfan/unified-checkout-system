import { Metadata } from 'next';
import Image from 'next/image';

import { RootProvider } from '../../providers/RootProvider';
import bgImage from '../../public/bg-sidebar-mobile.svg';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Checkout process for the unified checkout system',
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootProvider>
      <div className="bg-blue-100">
        <div className="fixed top-0 right-0 left-0 pointer-events-none" aria-hidden="true">
          <Image src={bgImage} alt="" role="presentation" priority className="w-full" />
        </div>

        <main className="relative min-h-screen flex flex-col">{children}</main>
      </div>
    </RootProvider>
  );
}
