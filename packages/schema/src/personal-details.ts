import { z } from 'zod';

export const PersonaTitles = {
  Mr: 'mr',
  Mrs: 'mrs',
  Ms: 'ms',
  Dr: 'dr',
  Prof: 'prof',
} as const;

export const PersonalDetailsSchema = z.object({
  title: z.enum(Object.values(PersonaTitles)).optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.date(),
  email: z.email('Invalid email address'),
});

export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;
