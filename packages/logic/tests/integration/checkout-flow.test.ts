import { createActor } from 'xstate';
import { describe, it, expect } from 'vitest';

import { checkoutFlowMachine } from '../../src/checkout/machines/checkout-flow';

describe('Checkout Flow Orchestrator', () => {
  it('should start in the personalDetailsStep state', () => {
    const actor = createActor(checkoutFlowMachine).start();

    expect(actor.getSnapshot().value).toBe('personalDetailsStep');
  });
});
