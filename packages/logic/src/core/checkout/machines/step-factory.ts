import { setup, assign, fromPromise } from 'xstate';
import { PaymentDetailsSchema, AddressSchema, PersonalDetailsSchema } from '@repo/schema';

interface StepConfig<TData, TOutput> {
  id: string;
  schema: typeof PaymentDetailsSchema | typeof AddressSchema | typeof PersonalDetailsSchema;
  saveData: (data: TData) => Promise<TOutput>;
}

export const createStepMachine = <TData, TOutput = TData>({
  id,
  schema,
  saveData,
}: StepConfig<TData, TOutput>) => {
  type Context = { data: TData | null; error: string | null; retryCount: number };
  type Event = { type: 'SUBMIT'; payload: TData } | { type: 'RETRY' };
  type Input = { initialData: TData | null };
  type Output = TOutput;

  return setup({
    types: {} as {
      context: Context;
      event: Event;
      input: Input;
      output: Output;
    },
    actors: {
      saveActor: fromPromise(async ({ input }: { input: TData }) => {
        return await saveData(input);
      }),
    },
    guards: {
      isValidData: ({ event }) => {
        if (event.type !== 'SUBMIT') return false;

        return schema.safeParse(event.payload).success;
      },
      canRetry: ({ context }) => context.retryCount < 3,
    },
  }).createMachine({
    id,
    context: ({ input }) => ({
      data: input.initialData,
      error: null,
      retryCount: 0,
    }),
    initial: 'idle',
    states: {
      idle: {
        on: {
          SUBMIT: [
            {
              guard: 'isValidData',
              target: 'submitting',
              actions: assign(({ event }) => ({
                data: event.payload,
                error: null,
              })),
            },
            {
              actions: assign({
                error: ({ event }) => {
                  const result = schema.safeParse(event.payload);

                  if (result.success) return null;

                  return `Invalid ${id} provided.`;
                },
              }),
            },
          ],
        },
      },
      submitting: {
        // @ts-expect-error - XState v5 known limitation with generic factory functions and actor typing
        invoke: {
          src: 'saveActor',
          input: ({ context }: { context: Context }) => {
            if (!context.data) throw new Error('No data to save');

            return context.data;
          },
          onDone: {
            target: 'success',
          },
          onError: {
            target: 'failure',
            actions: assign(({ event }) => ({
              error: (event.error as Error)?.message || 'Save operation failed',
            })),
          },
        },
      },
      failure: {
        on: {
          RETRY: {
            guard: 'canRetry',
            target: 'submitting',
            actions: assign(({ context }) => ({
              retryCount: context.retryCount + 1,
              error: null,
            })),
          },
        },
      },
      success: {
        type: 'final',
      },
    },
    output: ({ context }) => context.data as TOutput,
  });
};
