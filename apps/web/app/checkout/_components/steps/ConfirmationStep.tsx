'use client';

import { useCallback } from 'react';

import { useCheckoutSelector } from '../../../../hooks/checkout';
import { Surface, Heading, Text } from '../../../../components/ui';
import { StepControls } from '../StepControls';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const ConfirmationStep = () => {
  const values = useCheckoutSelector(
    useCallback((state) => {
      const personalDetails = state.context.personalDetailsData;
      const shippingAddress = state.context.shippingAddressData;
      const paymentDetails = state.context.paymentDetailsData;

      return {
        fullName: [personalDetails?.title, personalDetails?.firstName, personalDetails?.lastName]
          .filter(Boolean)
          .join(' '),
        dob: formatDate(personalDetails?.dateOfBirth),
        email: personalDetails?.email,
        phoneNumber: personalDetails?.phoneNumber,
        addressLine1: [shippingAddress.street, shippingAddress.houseNumber].join(', '),
        addressLine2: [shippingAddress.city, shippingAddress.postalCode].join(', '),
        country: shippingAddress?.country,
        paymentDetails,
      };
    }, []),
  );

  return (
    <>
      <div className="relative mx-4 my-24">
        <Surface>
          <Heading>Confirmation</Heading>

          <Text className="mt-2">Please review your order details before confirming.</Text>

          <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>
          <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>
          <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>
          <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>
        </Surface>
      </div>

      <StepControls nextLabel="Confirm" />
    </>
  );
};
