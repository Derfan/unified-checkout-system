import { PersonalDetails, PaymentDetails, Address } from '@repo/schema';

const wait = async (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export const savePersonalDetails: (data: PersonalDetails) => Promise<PersonalDetails> = async (
  data,
) => {
  await wait();

  return data;
};

export const saveShippingAddress: (data: Address) => Promise<Address> = async (data) => {
  await wait();

  return data;
};

export const savePaymentDetails: (data: PaymentDetails) => Promise<PaymentDetails> = async (
  data,
) => {
  await wait();

  return data;
};
