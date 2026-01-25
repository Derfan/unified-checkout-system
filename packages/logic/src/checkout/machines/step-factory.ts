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
              guard: ({ event }) => schema.safeParse(event.payload).success,
              target: 'submitting',
              actions: assign({
                data: ({ event }) => event.payload,
                error: null,
              }),
            },
            {
              actions: assign({
                error: `Invalid ${id} provided.`,
              }),
            },
          ],
        },
      },
      submitting: {
        // @ts-expect-error - XState v5 generic typing issue with factory functions
        invoke: {
          src: 'saveActor',
          input: ({ context }) => {
            if (!context.data) throw new Error('No data');

            return context.data;
          },
          onDone: {
            target: 'success',
          },
          onError: {
            target: 'failure',
            actions: assign({
              error: ({ event }) => (event.error as Error)?.message || 'Failed',
            }),
          },
        },
      },
      failure: {
        on: {
          RETRY: {
            guard: ({ context }) => context.retryCount < 3,
            target: 'submitting',
            actions: assign({
              retryCount: ({ context }) => context.retryCount + 1,
              error: null,
            }),
          },
        },
      },
      success: {
        type: 'final',
        output: ({ context }) => context.data!,
      },
    },
  });
};
