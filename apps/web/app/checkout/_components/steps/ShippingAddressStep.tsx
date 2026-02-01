'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address, AddressSchema } from '@repo/schema';
import { useCheckoutStep } from '@repo/logic/react';

import { Row } from '../../../../components/layout';
import { FormField, Input } from '../../../../components/forms';
import { StepWrapper } from '../StepWrapper';

export const ShippingAddressStep = () => {
  const { state, submit } = useCheckoutStep<Address>('shipping-address');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(AddressSchema),
    defaultValues: state.data ?? {},
  });

  return (
    <StepWrapper
      title="Shipping Address"
      description="Please provide your shipping address for the order."
      submitting={state.submitting}
      onSubmit={handleSubmit(submit)}
    >
      <Row space="sm">
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
        <Input placeholder="e.g. Germany" {...register('country')} />
      </FormField>
    </StepWrapper>
  );
};
