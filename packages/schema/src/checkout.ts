import { z } from "zod";

import { PaymentDetailsSchema } from "./payment-details";
import { PersonalDetailsSchema } from "./personal-details";
import { AddressSchema } from "./address";

export const CheckoutSchema = z.object({
  personalDetails: PersonalDetailsSchema,
  billingAddress: AddressSchema,
  shippingAddress: AddressSchema,
  paymentDetails: PaymentDetailsSchema,
});

export type Checkout = z.infer<typeof CheckoutSchema>;
