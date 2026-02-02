import { useEffect, useRef } from 'react';
import { CheckoutFlowStates } from '@repo/logic';

import { useMediaQuery } from './useMediaQuery';

const stepsOrder: CheckoutFlowStates[] = [
  CheckoutFlowStates.PersonalDetailsStep,
  CheckoutFlowStates.ShippingAddressStep,
  CheckoutFlowStates.PaymentDetailsStep,
  CheckoutFlowStates.ConfirmationStep,
  CheckoutFlowStates.Completed,
];

const createVariants = (axis: 'x' | 'y') => ({
  initial: (dir: number) => ({
    opacity: 0,
    ...{ [axis]: 20 * dir },
  }),
  animate: {
    opacity: 1,
    ...{ [axis]: 0 },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    ...{ [axis]: -20 * dir },
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
});

/**
 * Hook to determine animation direction and variants based on the current step.
 * @param currentStep - current step in the checkout flow
 * @returns object containing direction and animation variants
 */
export const useStepAnimation = (currentStep: CheckoutFlowStates) => {
  const prevStepRef = useRef<CheckoutFlowStates | null>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const prevIndex = prevStepRef.current ? stepsOrder.indexOf(prevStepRef.current) : -1;
  const currentIndex = stepsOrder.indexOf(currentStep);
  const direction = currentIndex > prevIndex ? 1 : -1;

  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  return {
    direction,
    variants: createVariants(isDesktop ? 'y' : 'x'),
  };
};
