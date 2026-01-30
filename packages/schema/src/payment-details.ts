import { z } from 'zod';

const verifyCardNumber = (num: string): boolean => {
  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  for (let i = num.length - 1; i >= 0; i--) {
    const char = num[i];

    if (!char) continue;

    let digit = parseInt(char);

    if (isEven) {
      digit *= 2;

      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

const CARD_NUMBER_PATTERN = /^[0-9]{13,19}$/;
const CVV_PATTERN = /^[0-9]{3,4}$/;
const NAME_PATTERN = /^[a-zA-Z\s\-']+$/;

export const PaymentDetailsSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Required')
    .transform((val) => val.replace(/\s/g, ''))
    .pipe(
      z
        .string()
        .regex(CARD_NUMBER_PATTERN, 'Invalid card number')
        .refine(verifyCardNumber, 'Invalid card number'),
    ),
  cardHolderName: z
    .string()
    .min(1, 'Required')
    .min(3, 'At least 3 characters')
    .max(50, 'Max 50 characters')
    .regex(NAME_PATTERN, 'Invalid characters')
    .transform((val) => val.trim().toUpperCase()),
  expiryDate: z
    .string()
    .min(1, 'Required')
    .transform((val) => val.replace(/\s/g, ''))
    .pipe(
      z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid format (MM/YY)')
        .refine((val) => {
          const parts = val.split('/');
          const month = parts[0] ? parseInt(parts[0]) : 0;
          const year = parts[1] ? parseInt(parts[1]) : 0;
          const now = new Date();
          const currentYear = now.getFullYear() % 100;
          const currentMonth = now.getMonth() + 1;

          return year > currentYear || (year === currentYear && month >= currentMonth);
        }, 'Card expired'),
    ),
  cvv: z.string().min(1, 'Required').regex(CVV_PATTERN, 'Must be 3-4 digits'),
});

export type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;
