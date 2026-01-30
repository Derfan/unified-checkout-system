import { z } from 'zod';

const POSTAL_CODE_PATTERN = /^[A-Z0-9\s-]{3,10}$/i;
const HOUSE_NUMBER_PATTERN = /^[0-9]+[A-Za-z]?$/;

export const AddressSchema = z.object({
  street: z
    .string()
    .min(1, 'Required')
    .min(2, 'At least 2 characters')
    .max(100, 'Max 100 characters')
    .transform((val) => val.trim()),
  houseNumber: z
    .string()
    .min(1, 'Required')
    .max(10, 'Max 10 characters')
    .regex(HOUSE_NUMBER_PATTERN, 'Invalid format')
    .transform((val) => val.trim()),
  city: z
    .string()
    .min(1, 'Required')
    .min(2, 'At least 2 characters')
    .max(50, 'Max 50 characters')
    .transform((val) => val.trim()),
  postalCode: z
    .string()
    .min(1, 'Required')
    .min(3, 'At least 3 characters')
    .max(10, 'Max 10 characters')
    .regex(POSTAL_CODE_PATTERN, 'Invalid format')
    .transform((val) => val.trim().toUpperCase()),
  country: z
    .string()
    .min(1, 'Required')
    .min(2, 'At least 2 characters')
    .max(50, 'Max 50 characters')
    .transform((val) => val.trim()),
});

export type Address = z.infer<typeof AddressSchema>;
