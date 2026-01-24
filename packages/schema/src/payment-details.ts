import { z } from "zod";

export const PaymentDetailsSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  cardHolderName: z.string().min(1, "Card holder name is required"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date"),
  cvv: z.string().min(3, "CVV must be 3 digits").max(4, "CVV must be 4 digits"),
});

export type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;
