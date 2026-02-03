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
    <Image
      src={bgMobileImage}
      alt="background"
      role="presentation"
      className="object-contain object-top md:hidden"
      loading="eager"
      fill
    />

    <nav className="sticky top-0 py-8 md:hidden" aria-label="Progress">
      {stepper}
    </nav>

    <main className="relative px-4 mb-24 md:px-10 md:my-20 md:mx-auto md:max-w-200">
      <LayoutGroup>
        <motion.div layout="size" transition={{ duration: 0.3 }}>
          <Surface className="md:flex md:gap-x-10 md:p-4 md:pr-8">
            <aside className="relative hidden md:block md:shrink-0 md:w-60 md:min-h-130 ">
              <Image
                src={bgDesktopImage}
                alt="background"
                className="rounded object-cover object-bottom"
                role="presentation"
                loading="eager"
                aria-hidden="true"
                fill
              />

              <nav className="relative px-6 py-8" aria-label="Progress">
                {stepper}
              </nav>
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
