'use client';

import { AnimatePresence, motion } from 'motion/react';
import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState } from '@repo/logic/react';

import { useStepAnimation } from '../hooks/useStepAnimation';
import { StepLayout } from './StepLayout';
import { Stepper } from './Stepper';
import { StepControls } from './StepControls';

import {
  PersonalInfoStep,
  ShippingAddressStep,
  PaymentDetailsStep,
  ConfirmationStep,
  CompletedStep,
} from './steps';

const StateToComponentMap: Record<CheckoutFlowStates, React.FC> = {
  [CheckoutFlowStates.PersonalDetailsStep]: PersonalInfoStep,
  [CheckoutFlowStates.ShippingAddressStep]: ShippingAddressStep,
  [CheckoutFlowStates.PaymentDetailsStep]: PaymentDetailsStep,
  [CheckoutFlowStates.ConfirmationStep]: ConfirmationStep,
  [CheckoutFlowStates.Completed]: CompletedStep,
};

export const CheckoutController = () => {
  const { currentStep } = useCheckoutState();
  const { direction, variants } = useStepAnimation(currentStep);

  const StepComponent = StateToComponentMap[currentStep];

  return (
    <StepLayout
      stepper={<Stepper />}
      content={
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            layout="size"
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      }
      controls={currentStep !== CheckoutFlowStates.Completed ? <StepControls /> : null}
    />
  );
};
