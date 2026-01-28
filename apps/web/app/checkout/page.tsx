import { PersonaTitles } from '@repo/schema';

import { Stepper } from './_components/Stepper';
import { StepNavigation } from './_components/StepNavigation';

import { Surface, Heading, Text } from '../../components/ui';
import { FormField, RadioGroup, Input, PhoneInput } from '../../components/forms';

export default function CheckoutPage() {
  return (
    <>
      <Stepper className="py-8" />

      <div className="grow px-4">
        <Surface>
          <Heading>Checkout</Heading>

          <Text className="mt-2">Please review your order before proceeding to payment.</Text>

          <FormField id="title" name="title" label="Title" className="mt-4">
            <RadioGroup
              options={[
                { label: 'Mr.', value: PersonaTitles.Mr },
                { label: 'Mrs.', value: PersonaTitles.Mrs },
                { label: 'Ms.', value: PersonaTitles.Ms },
                { label: 'Dr.', value: PersonaTitles.Dr },
                { label: 'Prof.', value: PersonaTitles.Prof },
              ]}
            />
          </FormField>

          <FormField id="firstName" name="firstName" label="First Name" className="mt-2">
            <Input placeholder="e.g. Stephen" />
          </FormField>

          <FormField id="lastName" name="lastName" label="Last Name" className="mt-2">
            <Input placeholder="e.g. King" />
          </FormField>

          <FormField id="phoneNumber" name="phoneNumber" label="Phone Number" className="mt-2">
            <PhoneInput placeholder="e.g. +49 1234 567890" />
          </FormField>

          <FormField id="email" name="email" label="Email Address" className="mt-2">
            <Input type="email" inputMode="email" placeholder="e.g. stephen.king@example.com" />
          </FormField>
        </Surface>
      </div>

      <StepNavigation />
    </>
  );
}
