import type { AnyActorRef, StateValue } from 'xstate';
import { useSelector } from '@xstate/react';

import { useCheckoutSelector } from './useCheckout';

export interface StepMachineSnapshot<TData = unknown> {
  value: StateValue;
  context: {
    data: TData | null;
    error: string | null;
    retryCount: number;
  };
  matches: (value: StateValue) => boolean;
}

export const useCheckoutChildActorRef = <T extends string>(key: T) => {
  return useCheckoutSelector((state) => state.children[key]);
};

export const useCheckoutChildActorState = <TData = unknown, TSelected = unknown>(
  actorId: string,
  selector: (snapshot: StepMachineSnapshot<TData>) => TSelected,
  fallback?: TSelected,
) => {
  const childActorRef = useCheckoutChildActorRef(actorId);

  if (!childActorRef) {
    return fallback as TSelected;
  }

  return useSelector(childActorRef as AnyActorRef, selector);
};
