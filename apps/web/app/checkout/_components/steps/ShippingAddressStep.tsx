'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address, AddressSchema } from '@repo/schema';

import { useCheckoutSelector } from '../../../../hooks/checkout';
import { Surface, Heading, Text } from '../../../../components/ui';
import { StepControls } from '../StepControls';

export const ShippingAddressStep = () => {
  const { defaultValues, actor } = useCheckoutSelector(
    useCallback(
      (state) => ({
        defaultValues: state.context.shippingAddress ?? {},
        actor: state.children['shipping-address'],
      }),
      [],
    ),
  );
  const { handleSubmit } = useForm<Address>({
    resolver: zodResolver(AddressSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    (data: Address) => {
      actor?.send({ type: 'SUBMIT', payload: data });
    },
    [actor],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col grow">
        <div className="grow px-4">
          <Surface>
            <Heading>Shipping Address</Heading>

            <Text className="mt-2">Please provide your shipping address for the order.</Text>
          </Surface>
        </div>

        <StepControls />
      </form>
    </>
  );
};
