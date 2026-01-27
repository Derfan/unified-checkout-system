import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

import { Surface, Heading, Text } from '../../components/ui';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8" />

      <div className="grow px-4">
        <Surface>
          <Heading>Checkout</Heading>
          <Text className="mt-2">Please review your order before proceeding to payment.</Text>
        </Surface>
      </div>

      <StepNavigation />
    </>
  );
}
