'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address, AddressSchema } from '@repo/schema';

import { useCheckoutSelector, useCheckoutChildActorRef } from '../../../../hooks/checkout';
import { Row } from '../../../../components/layout';
import { Surface, Heading, Text } from '../../../../components/ui';
import { FormField, Input } from '../../../../components/forms';
import { StepControls } from '../StepControls';

export const ShippingAddressStep = () => {
  const defaultValues = useCheckoutSelector(
    useCallback((state) => state.context.shippingAddressData ?? {}, []),
  );
  const childActorRef = useCheckoutChildActorRef('shipping-address');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(AddressSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    (data: Address) => {
      childActorRef?.send({ type: 'SUBMIT', payload: data });
    },
    [childActorRef],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mx-4 my-24">
          <Surface>
            <Heading>Shipping Address</Heading>

            <Text className="mt-2">Please provide your shipping address for the order.</Text>

            <Row space="sm" className="mt-4">
              <FormField id="street" label="Street" errorMessage={errors.street?.message}>
                <Input placeholder="e.g. Main St" {...register('street')} />
              </FormField>

              <FormField
                id="houseNumber"
                label="House Number"
                errorMessage={errors.houseNumber?.message}
              >
                <Input placeholder="e.g. 123" {...register('houseNumber')} />
              </FormField>
            </Row>

            <Row space="sm" className="mt-2">
              <FormField id="city" label="City" errorMessage={errors.city?.message}>
                <Input placeholder="e.g. Anytown" {...register('city')} />
              </FormField>

              <FormField
                id="postalCode"
                label="Postal Code"
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
          </Surface>
        </div>

        <StepControls />
      </form>
    </>
  );
};
