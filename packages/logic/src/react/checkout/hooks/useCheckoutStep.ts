import { useCallback, useMemo } from 'react';
import type { SnapshotFrom } from 'xstate';
import { useSelector } from '@xstate/react';

import {
  useCheckoutChildActorRef,
  type StepActorRefMap,
  type StepActorRef,
} from './useCheckoutChildActor';

interface StepMachineContext<TData> {
  data: TData | null;
  error: string | null;
  retryCount: number;
}

interface StepMachineSnapshot<TData> {
  context: StepMachineContext<TData>;
  matches: (state: string) => boolean;
  value: unknown;
}

type ExtractDataType<T extends StepActorRef> =
  SnapshotFrom<T> extends {
    context: { data: infer D | null };
  }
    ? D
    : never;

type StepDataMap = {
  [K in keyof StepActorRefMap]: ExtractDataType<StepActorRefMap[K]>;
};

type StepEvent<TData> = { type: 'SUBMIT'; payload: TData } | { type: 'RETRY' };

export interface UseCheckoutStepReturn<TData> {
  actorRef: StepActorRef | undefined;
  send: ((event: StepEvent<TData>) => void) | undefined;
  state: {
    submitting: boolean;
    error: string | null;
    data: TData | null;
  };
  submit: (data: TData) => void;
  retry: () => void;
}

export const useCheckoutStep = <TStepId extends keyof StepActorRefMap>(
  stepId: TStepId,
): UseCheckoutStepReturn<StepDataMap[TStepId]> => {
  const actorRef = useCheckoutChildActorRef(stepId);

  type TData = StepDataMap[TStepId];

  const state = useSelector(
    actorRef,
    (snapshot) => {
      if (!snapshot) {
        return { submitting: false, error: null, data: null };
      }

      const stepSnapshot = snapshot as unknown as StepMachineSnapshot<TData>;

      return {
        submitting: stepSnapshot.matches('submitting'),
        error: stepSnapshot.context.error,
        data: stepSnapshot.context.data,
      };
    },
    (a, b) => a.submitting === b.submitting && a.error === b.error && a.data === b.data,
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

  const send = useMemo(
    () => (actorRef?.send ? (event: StepEvent<TData>) => actorRef.send(event) : undefined),
    [actorRef],
  );

  return {
    actorRef,
    send,
    state,
    submit,
    retry,
  };
};
