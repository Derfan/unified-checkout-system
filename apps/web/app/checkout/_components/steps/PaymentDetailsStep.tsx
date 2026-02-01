'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentDetailsSchema } from '@repo/schema';
import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutStep } from '@repo/logic/react';

import { Row } from '../../../../components/layout';
import { Heading, Text } from '../../../../components/ui';
import { FormField, Input, CardInput, ExpiryInput, CvvInput } from '../../../../components/forms';

export const PaymentDetailsStep = () => {
  const { state, submit } = useCheckoutStep('payment-details');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PaymentDetailsSchema),
    defaultValues: state.data ?? {},
  });

  return (
    <form id={CheckoutFlowStates.PaymentDetailsStep} onSubmit={handleSubmit(submit)}>
      <Heading>Payment Details</Heading>

      <Text variant="secondary" className="mt-2 mb-4">
        Please provide your payment details for the order.
      </Text>

      <FormField
        id="cardHolderName"
        label="Card Holder Name"
        className="mt-4"
        errorMessage={errors.cardHolderName?.message}
      >
        <Input placeholder="e.g. John Doe" autoComplete="cc-name" {...register('cardHolderName')} />
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
        <FormField id="expiryDate" label="Expiry Date" errorMessage={errors.expiryDate?.message}>
          <ExpiryInput placeholder="e.g. 12/34" {...register('expiryDate')} />
        </FormField>

        <FormField id="cvv" label="CVV" errorMessage={errors.cvv?.message}>
          <CvvInput placeholder="e.g. 123" {...register('cvv')} />
        </FormField>
      </Row>
    </form>
  );
};
