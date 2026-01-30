'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentDetails, PaymentDetailsSchema } from '@repo/schema';

import { useCheckoutChildActorRef, useCheckoutSelector } from '../../../../hooks/checkout';
import { Row } from '../../../../components/layout';
import { Surface, Heading, Text } from '../../../../components/ui';
import { FormField, Input, CardInput, ExpiryInput, CvvInput } from '../../../../components/forms';
import { StepControls } from '../StepControls';

export const PaymentDetailsStep = () => {
  const defaultValues = useCheckoutSelector(
    useCallback((state) => state.context.paymentDetailsData ?? {}, []),
  );
  const childActorRef = useCheckoutChildActorRef('payment-details');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PaymentDetails>({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues,
  });

  const onSubmit = useCallback(
    (data: PaymentDetails) => {
      childActorRef?.send({ type: 'SUBMIT', payload: data });
    },
    [childActorRef],
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mx-4 my-24">
          <Surface>
            <Heading>Payment Details</Heading>

            <Text className="mt-2">Please provide your payment details for the order.</Text>

            <FormField
              id="cardHolderName"
              label="Card Holder Name"
              className="mt-4"
              errorMessage={errors.cardHolderName?.message}
            >
              <Input placeholder="e.g. John Doe" {...register('cardHolderName')} />
            </FormField>

            <FormField
              id="cardNumber"
              label="Card Number"
              className="mt-2"
              errorMessage={errors.cardNumber?.message}
            >
              <CardInput placeholder="e.g. 1234 5678 9012 3456" {...register('cardNumber')} />
            </FormField>

            <Row space="sm" className="mt-2">
              <FormField
                id="expiryDate"
                label="Expiry Date"
                className="mt-2"
                errorMessage={errors.expiryDate?.message}
              >
                <ExpiryInput placeholder="e.g. 12/34" {...register('expiryDate')} />
              </FormField>

              <FormField id="cvv" label="CVV" className="mt-2" errorMessage={errors.cvv?.message}>
                <CvvInput placeholder="e.g. 123" {...register('cvv')} />
              </FormField>
            </Row>
          </Surface>
        </div>

        <StepControls />
      </form>
    </>
  );
};
