'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressSchema } from '@repo/schema';
import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutStep } from '@repo/logic/react';

import { Heading, Text } from '../../../../components/ui';
import { Row } from '../../../../components/layout';
import { FormField, Input } from '../../../../components/forms';

export const ShippingAddressStep = () => {
  const { state, submit } = useCheckoutStep('shipping-address');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: state.data ?? {},
  });

  return (
    <form id={CheckoutFlowStates.ShippingAddressStep} onSubmit={handleSubmit(submit)}>
      <Heading>Shipping Address</Heading>

      <Text variant="secondary" className="mt-2">
        Please provide your shipping address for the order.
      </Text>

      <Row space="sm" className="mt-4">
        <FormField
          id="street"
          label="Street"
          className="w-2/3"
          errorMessage={errors.street?.message}
        >
          <Input placeholder="e.g. Main St" {...register('street')} />
        </FormField>

        <FormField
          id="houseNumber"
          label="House Number"
          className="w-1/3"
          errorMessage={errors.houseNumber?.message}
        >
          <Input placeholder="e.g. 123" {...register('houseNumber')} />
        </FormField>
      </Row>

      <Row space="sm" className="mt-2">
        <FormField id="city" label="City" className="w-2/3" errorMessage={errors.city?.message}>
          <Input placeholder="e.g. Anytown" {...register('city')} />
        </FormField>

        <FormField
          id="postalCode"
          label="Postal Code"
          className="w-1/3"
          errorMessage={errors.postalCode?.message}
        >
          <Input placeholder="e.g. 12345" {...register('postalCode')} />
        </FormField>
      </Row>

      <FormField
        id="country"
        label="Country"
        className="mt-2"
        errorMessage={errors.country?.message}
      >
        <Input placeholder="e.g. Germany" autoComplete="country-name" {...register('country')} />
      </FormField>
    </form>
  );
};
