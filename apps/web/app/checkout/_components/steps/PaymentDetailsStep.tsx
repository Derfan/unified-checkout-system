'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentDetails, PaymentDetailsSchema } from '@repo/schema';

import { useCheckoutSelector } from '../../../../hooks/checkout';
import { Surface, Heading, Text } from '../../../../components/ui';
import { StepControls } from '../StepControls';

export const PaymentDetailsStep = () => {
  const { defaultValues, actor } = useCheckoutSelector(
    useCallback(
      (state) => ({
        defaultValues: state.context.paymentDetails ?? {},
        actor: state.children['payment-details'],
      }),
      [],
    ),
  );
  const { handleSubmit } = useForm<PaymentDetails>({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    (data: PaymentDetails) => {
      actor?.send({ type: 'SUBMIT', payload: data });
    },
    [actor],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col grow">
        <div className="grow px-4">
          <Surface>
            <Heading>Payment Details</Heading>

            <Text className="mt-2">Please provide your payment details for the order.</Text>
          </Surface>
        </div>

        <StepControls />
      </form>
    </>
  );
};
