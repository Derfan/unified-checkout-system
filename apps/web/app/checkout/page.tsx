import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

import { Surface, Heading, Text } from '../../components/ui';
import { FormField, Input, PhoneInput } from '../../components/forms';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8" />

      <div className="grow px-4">
        <Surface>
          <Heading>Checkout</Heading>

          <Text className="mt-2">Please review your order before proceeding to payment.</Text>

          <FormField label="First Name" className="mt-4">
            <Input placeholder="e.g. Stephen" />
          </FormField>

          <FormField label="Last Name" className="mt-2">
            <Input placeholder="e.g. King" />
          </FormField>

          <FormField label="Phone Number" className="mt-2">
            <PhoneInput placeholder="e.g. +49 1234 567890" />
          </FormField>
        </Surface>
      </div>

      <StepNavigation />
    </>
  );
}
