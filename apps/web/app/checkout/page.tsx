import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

import { Surface, Heading, Text } from '../../components/ui';
import { FormField, TextInput } from '../../components/forms';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8" />

      <div className="grow px-4">
        <Surface>
          <Heading>Checkout</Heading>

          <Text className="mt-2">Please review your order before proceeding to payment.</Text>

          <FormField label="First Name" className="mt-4">
            <TextInput placeholder="John" />
          </FormField>

          <FormField label="Last Name" className="mt-2">
            <TextInput placeholder="Doe" />
          </FormField>
        </Surface>
      </div>

      <StepNavigation />
    </>
  );
}
