import { ActorRefFrom } from 'xstate';
import { AddressSchema } from '@repo/schema';
import type { Address } from '@repo/schema';

import { createStepMachine } from '../step-factory';
import { saveShippingAddress } from '../../actors/api-services';

export const shippingAddressMachine = createStepMachine<Address>({
  id: 'shipping-address',
  schema: AddressSchema,
  saveData: saveShippingAddress,
});

export type ShippingAddressActorRef = ActorRefFrom<typeof shippingAddressMachine>;
