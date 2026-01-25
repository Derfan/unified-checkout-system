import { z } from 'zod';

export const PersonalDetailsSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']).optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.date(),
  email: z.email('Invalid email address'),
});

export type PersonalDetails = z.infer<typeof PersonalDetailsSchema>;
