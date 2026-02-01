'use client';

import { useCallback } from 'react';
import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutSelector, useCheckoutActorRef } from '@repo/logic/react';

import { Text, Divider, Heading } from '@components/ui';

// TODO: Move to utils
const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

export const ConfirmationStep = () => {
  const checkoutActorRef = useCheckoutActorRef();
  const values = useCheckoutSelector(
    useCallback((state) => {
      const personalDetails = state.context.personalDetailsData;
      const shippingAddress = state.context.shippingAddressData;

      return {
        fullName: [
          personalDetails?.title ? `${capitalize(personalDetails.title)}.` : null,
          personalDetails?.firstName,
          personalDetails?.lastName,
        ]
          .filter(Boolean)
          .join(' '),
        email: personalDetails?.email,
        phoneNumber: personalDetails?.phoneNumber,
        addressLine1: [shippingAddress?.street, shippingAddress?.houseNumber].join(', '),
        addressLine2: [shippingAddress?.postalCode, shippingAddress?.city].join(', '),
      };
    }, []),
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      checkoutActorRef.send({ type: 'SUBMIT' });
    },
    [checkoutActorRef],
  );

  return (
    <form id={CheckoutFlowStates.ConfirmationStep} onSubmit={handleSubmit}>
      <Heading>Confirmation</Heading>

      <Text variant="secondary" className="mt-2">
        Please review your order details before confirming.
      </Text>

      <div className="bg-blue-50 p-4 rounded-md gap-y-4 flex flex-col mt-4">
        <div>
          <Text variant="secondary" size="sm" className="mb-1" uppercase>
            Shipping To
          </Text>
          <Text>{values.fullName}</Text>
          <Text>{values.addressLine1}</Text>
          <Text>{values.addressLine2}</Text>
        </div>

        <Divider />

        <div>
          <Text variant="secondary" size="sm" className="mb-1" uppercase>
            Contact
          </Text>
          <Text>{values.phoneNumber}</Text>
          <Text>{values.email}</Text>
        </div>
      </div>
    </form>
  );
};
