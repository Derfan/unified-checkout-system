import { ActorRefFrom } from 'xstate';
import { PaymentDetailsSchema } from '@repo/schema';
import type { PaymentDetails } from '@repo/schema';

import { createStepMachine } from '../step-factory';
import { savePaymentDetails } from '../../actors/api-services';

export const paymentDetailsMachine = createStepMachine<PaymentDetails>({
  id: 'payment-details',
  schema: PaymentDetailsSchema,
  saveData: savePaymentDetails,
});

export type PaymentDetailsActorRef = ActorRefFrom<typeof paymentDetailsMachine>;
