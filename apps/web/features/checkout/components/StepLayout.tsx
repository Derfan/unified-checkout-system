import Image from 'next/image';
import { motion, LayoutGroup } from 'motion/react';

import { Surface } from '@components/ui';

import bgMobileImage from '@/public/bg-sidebar-mobile.svg';
import bgDesktopImage from '@/public/bg-sidebar-desktop.svg';

interface StepLayoutProps {
  stepper: React.ReactNode;
  content: React.ReactNode;
  controls?: React.ReactNode;
}

export const StepLayout = ({ stepper, content, controls }: StepLayoutProps) => (
  <div className="relative min-h-screen flex flex-col scrollable-main">
    <div className="fixed top-0 right-0 left-0 pointer-events-none md:sr-only" aria-hidden="true">
      <Image src={bgMobileImage} alt="" role="presentation" className="w-full" loading="eager" />
    </div>

    <nav className="fixed top-0 left-0 right-0 py-8 z-10 md:hidden" aria-label="Progress">
      {stepper}
    </nav>

    <main className="relative px-4 py-24 md:px-10 md:py-20">
      <LayoutGroup>
        <motion.div layout="size" transition={{ duration: 0.3 }}>
          <Surface className="md:flex md:gap-x-10 overflow-hidden">
            <aside className="relative hidden md:block md:shrink-0 md:w-60">
              <nav className="absolute px-6 py-8 z-10" aria-label="Progress">
                {stepper}
              </nav>

              <Image
                src={bgDesktopImage}
                alt=""
                className="pointer-events-none w-full h-auto"
                role="presentation"
                loading="eager"
                aria-hidden="true"
              />
            </aside>

            <div className="md:flex-1 md:flex md:flex-col md:min-w-0">
              <div className="w-full md:mt-6">{content}</div>

              <div className="hidden md:block md:mt-auto">{controls}</div>
            </div>
          </Surface>
        </motion.div>
      </LayoutGroup>
    </main>

    {controls && (
      <div className="p-4 bg-white shadow-sm fixed bottom-0 left-0 right-0 md:hidden">
        {controls}
      </div>
    )}
  </div>
);
