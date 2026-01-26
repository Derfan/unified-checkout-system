'use client';

import { createActorContext } from '@xstate/react';
import { checkoutFlowMachine } from '@repo/logic';

export const CheckoutContext = createActorContext(checkoutFlowMachine);

export const CheckoutProvider = CheckoutContext.Provider;
