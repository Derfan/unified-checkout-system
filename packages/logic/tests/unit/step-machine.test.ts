import { createActor, fromPromise } from 'xstate';
import { describe, it, expect, vi } from 'vitest';
import { PersonalDetails } from '@repo/schema';

import { personalDetailsMachine } from '../../src/checkout/machines/steps/personal-details';

describe('Step Machine (Personal Details)', () => {
  const validData: PersonalDetails = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1990-01-01'),
    email: 'john@test.com',
  };

  it('should start in "idle" state with initial data from input', () => {
    const actor = createActor(personalDetailsMachine, {
      input: { initialData: validData },
    }).start();
    const snapshot = actor.getSnapshot();

    expect(snapshot.value).toBe('idle');
    expect(snapshot.context.data).toBe(validData);
  });

  it('should transition to "submitting" when valid data is provided', () => {
    const actor = createActor(personalDetailsMachine, {
      input: { initialData: null },
    }).start();

    actor.send({ type: 'SUBMIT', payload: validData });

    expect(actor.getSnapshot().value).toBe('submitting');
    expect(actor.getSnapshot().context.data).toEqual(validData);
  });

  it('should stay in "idle" and set an error message if validation fails', () => {
    const actor = createActor(personalDetailsMachine, {
      input: { initialData: null },
    }).start();

    // Sending invalid data (missing fields required by PersonalDetailsSchema)
    actor.send({ type: 'SUBMIT', payload: { firstName: 'J' } });

    const snapshot = actor.getSnapshot();

    expect(snapshot.value).toBe('idle');
    expect(snapshot.context.error).toBe('Invalid personal-details provided.');
  });

  it('should reach "success" state when the save actor resolves', async () => {
    const mockSave = vi.fn().mockResolvedValue(validData);
    const actor = createActor(
      personalDetailsMachine.provide({
        actors: {
          saveActor: fromPromise(mockSave),
        },
      }),
      { input: { initialData: null } },
    ).start();

    actor.send({ type: 'SUBMIT', payload: validData });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().status).toBe('done');
    expect(actor.getSnapshot().value).toBe('success');
    expect(mockSave).toHaveBeenCalled();
  });

  it('should transition to "failure" if the save actor fails', async () => {
    const mockSave = vi.fn().mockRejectedValue(new Error('Network Error'));
    const actor = createActor(
      personalDetailsMachine.provide({
        actors: {
          saveActor: fromPromise(mockSave),
        },
      }),
      { input: { initialData: null } },
    ).start();

    actor.send({ type: 'SUBMIT', payload: validData });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actor.getSnapshot().value).toBe('failure');
    expect(actor.getSnapshot().context.error).toBe('Network Error');
    expect(mockSave).toHaveBeenCalled();
  });

  it('should allow retrying up to 3 times', async () => {
    const mockSave = vi.fn().mockRejectedValue(new Error('Network Error'));
    const actor = createActor(
      personalDetailsMachine.provide({
        actors: {
          saveActor: fromPromise(mockSave),
        },
      }),
      { input: { initialData: null } },
    ).start();

    actor.send({ type: 'SUBMIT', payload: validData });
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // First Retry
    actor.send({ type: 'RETRY' });
    expect(actor.getSnapshot().context.retryCount).toBe(1);
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Reach max retries
    actor.send({ type: 'RETRY' });
    expect(actor.getSnapshot().context.retryCount).toBe(2);
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    actor.send({ type: 'RETRY' });
    expect(actor.getSnapshot().context.retryCount).toBe(3);
    // Wait for promise to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Fourth retry should be blocked by guard
    actor.send({ type: 'RETRY' });
    expect(actor.getSnapshot().context.retryCount).toBe(3);
  });
});
