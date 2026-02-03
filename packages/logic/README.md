# @repo/logic

> XState-powered business logic and state management for checkout flow

Framework-agnostic state machines with React bindings for managing multi-step checkout process.

## Why This Package?

- **Predictable state** - XState machines for bulletproof state management
- **Framework-agnostic core** - Use with React, Vue, or vanilla JS
- **Type-safe** - Full TypeScript support with inferred types
- **Testable** - Isolated logic from UI, easy to test
- **Built-in validation** - Integrates with `@repo/schema`

## Installation

```json
{
  "dependencies": {
    "@repo/logic": "workspace:*",
    "@repo/schema": "workspace:*"
  }
}
```

## Usage

### React Integration

```tsx
import { CheckoutProvider, useCheckoutState, useCheckoutNavigation } from '@repo/logic/react';

function App() {
  return (
    <CheckoutProvider>
      <CheckoutFlow />
    </CheckoutProvider>
  );
}

function CheckoutFlow() {
  const { currentStep, context } = useCheckoutState();
  const { goBack, goToStep } = useCheckoutNavigation();

  return (
    <div>
      <h1>Step: {currentStep}</h1>
      <button onClick={goBack}>Back</button>
      {/* Render current step component */}
    </div>
  );
}
```

### Core State Machine

```typescript
import { checkoutFlowMachine, CheckoutFlowStates } from '@repo/logic';
import { createActor } from 'xstate';

const actor = createActor(checkoutFlowMachine);
actor.start();

// Navigate between steps
actor.send({ type: 'GO_TO_STEP', payload: CheckoutFlowStates.ShippingAddressStep });
actor.send({ type: 'BACK' });

// Subscribe to state changes
actor.subscribe((state) => {
  console.log('Current step:', state.value);
  console.log('Context:', state.context);
});
```

## Architecture

### Checkout Flow Machine

Main orchestrator managing the multi-step flow:

**States:**

- `personalDetailsStep` - Personal information collection
- `shippingAddressStep` - Shipping address entry
- `paymentDetailsStep` - Payment information
- `confirmationStep` - Order review
- `completed` - Checkout finished

**Events:**

- `BACK` - Navigate to previous step
- `GO_TO_STEP` - Jump to specific step

**Context:**

```typescript
{
  personalDetailsData: PersonalDetails | null;
  shippingAddressData: Address | null;
  paymentDetailsData: PaymentDetails | null;
}
```

### Step Machines

Individual step machines created with `createStepMachine` factory:

```typescript
import { createStepMachine } from '@repo/logic';
import { PersonalDetailsSchema } from '@repo/schema';

const stepMachine = createStepMachine({
  id: 'personal-details',
  schema: PersonalDetailsSchema, // Zod schema for validation
  saveData: async (data) => {
    // API call
    return await api.save(data);
  },
});
```

**Step States:**

- `idle` - Waiting for user input
- `submitting` - Saving data to server
- `error` - Failed with retry option
- `success` - Data saved, proceed to next step

**Features:**

- Automatic validation using Zod schemas
- Retry logic (up to 3 attempts)
- Error handling
- Initial data support (edit mode)

## React Hooks

### useCheckoutState

```typescript
const { currentStep, context } = useCheckoutState();
// currentStep: 'personalDetailsStep' | 'shippingAddressStep' | ...
// context: { personalDetailsData, shippingAddressData, paymentDetailsData }
```

### useCheckoutNavigation

```typescript
const { goBack, goToStep } = useCheckoutNavigation();

goBack(); // Previous step
goToStep(CheckoutFlowStates.PaymentDetailsStep); // Jump to step
```

### useCheckoutChildActor

Access individual step machines:

```typescript
import { useCheckoutChildActor } from '@repo/logic/react';

const personalDetailsActor = useCheckoutChildActor('personal-details');

// Send events to step machine
personalDetailsActor?.send({
  type: 'SUBMIT',
  payload: formData,
});

// Subscribe to step state
const stepState = personalDetailsActor?.getSnapshot();
```

## Testing

The package includes comprehensive tests:

```bash
# Run tests
pnpm test

# With coverage
pnpm test:coverage
```

### Example Test

```typescript
import { checkoutFlowMachine, CheckoutFlowStates } from '@repo/logic';
import { createActor } from 'xstate';

test('navigates through checkout flow', async () => {
  const actor = createActor(checkoutFlowMachine);
  actor.start();

  expect(actor.getSnapshot().value).toBe(CheckoutFlowStates.PersonalDetailsStep);

  // Simulate step completion
  actor.send({ type: 'GO_TO_STEP', payload: CheckoutFlowStates.ShippingAddressStep });

  expect(actor.getSnapshot().value).toBe(CheckoutFlowStates.ShippingAddressStep);
});
```

## API Services

Mock API services for development (replace with real APIs in production):

```typescript
import { savePersonalDetails, saveShippingAddress, savePaymentDetails } from '@repo/logic';

// Each returns a Promise with validated data
await savePersonalDetails(data);
await saveShippingAddress(data);
await savePaymentDetails(data);
```

## Development

```bash
# Type check
pnpm run check-types

# Lint
pnpm run lint

# Test
pnpm test
```

## Package Exports

```typescript
// Core state machines (framework-agnostic)
import { checkoutFlowMachine, CheckoutFlowStates } from '@repo/logic';

// React integration
import { CheckoutProvider, useCheckoutState, useCheckoutNavigation } from '@repo/logic/react';
```

## Benefits

✅ **Separation of concerns** - Business logic isolated from UI  
✅ **State visualization** - Use [XState Visualizer](https://stately.ai/viz) to see flow  
✅ **Time travel debugging** - XState inspector integration  
✅ **Easy to extend** - Add new steps by creating step machines  
✅ **Production ready** - Error handling, retries, validation built-in
