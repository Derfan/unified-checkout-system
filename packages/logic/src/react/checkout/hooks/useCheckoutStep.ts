import { useCallback } from 'react';
import type { AnyActorRef } from 'xstate';

import { useCheckoutChildActorRef, useCheckoutChildActorState } from './useCheckoutChildActor';

type StepEvent<TData> = { type: 'SUBMIT'; payload: TData } | { type: 'RETRY' };

export interface UseCheckoutStepReturn<TData> {
  actorRef: AnyActorRef | undefined;
  send: ((event: StepEvent<TData>) => void) | undefined;
  state: {
    submitting: boolean;
    error: string | null;
    data: TData | null;
  };
  submit: (data: TData) => void;
  retry: () => void;
}

export const useCheckoutStep = <TData = unknown>(stepId: string): UseCheckoutStepReturn<TData> => {
  const actorRef = useCheckoutChildActorRef(stepId);

  const state = useCheckoutChildActorState<TData, UseCheckoutStepReturn<TData>['state']>(
    stepId,
    (snapshot) => ({
      submitting: snapshot.matches('submitting'),
      error: snapshot.context.error,
      data: snapshot.context.data as TData | null,
    }),
    { submitting: false, error: null, data: null },
  );

  const submit = useCallback(
    (data: TData) => {
      actorRef?.send({ type: 'SUBMIT', payload: data });
    },
    [actorRef],
  );

  const retry = useCallback(() => {
    actorRef?.send({ type: 'RETRY' });
  }, [actorRef]);

  return {
    actorRef,
    send: actorRef?.send ? (event: StepEvent<TData>) => actorRef.send(event) : undefined,
    state,
    submit,
    retry,
  };
};
