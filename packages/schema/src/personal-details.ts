import { z } from 'zod';

export const PersonaTitles = {
  Mr: 'mr',
  Mrs: 'mrs',
  Ms: 'ms',
  Dr: 'dr',
  Prof: 'prof',
} as const;

const NAME_PATTERN = /^[a-zA-Z\s'.-]+$/;
const PHONE_PATTERN = /^[\d\s+()-]+$/;

export const PersonalDetailsSchema = z.object({
  title: z.enum(Object.values(PersonaTitles), 'Required'),
  firstName: z
    .string()
    .min(1, 'Required')
    .min(2, 'At least 2 characters')
    .max(50, 'Max 50 characters')
    .regex(NAME_PATTERN, 'Invalid characters')
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(1, 'Required')
    .min(2, 'At least 2 characters')
    .max(50, 'Max 50 characters')
    .regex(NAME_PATTERN, 'Invalid characters')
    .transform((val) => val.trim()),
  dateOfBirth: z
    .string()
    .min(1, 'Required')
    .refine((date) => {
      const dob = new Date(date);
      return !isNaN(dob.getTime());
    }, 'Invalid date')
    .refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      return dob < today;
    }, 'Cannot be future date')
    .refine((date) => {
      const dob = new Date(date);
      const age = new Date().getFullYear() - dob.getFullYear();
      return age >= 18 && age <= 120;
    }, 'Must be 18 or older'),
  email: z
    .email('Invalid email')
    .min(1, 'Required')
    .max(254, 'Max 254 characters')
    .transform((val) => val.toLowerCase().trim()),
  phoneNumber: z
    .string()
    .min(1, 'Required')
    .min(10, 'Min 10 digits')
    .max(20, 'Max 20 characters')
    .regex(PHONE_PATTERN, 'Invalid format'),
});

export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;
