# Web App

> Next.js 16 checkout application with XState and Tailwind CSS

Multi-step checkout flow with type-safe forms, animations, and state management.

## Why This App?

- **Production ready** - Built with Next.js 16 App Router and React 19
- **Type-safe** - End-to-end TypeScript with validation
- **State management** - XState for predictable checkout flow
- **Smooth UX** - Motion animations between steps
- **Tested** - Comprehensive unit tests with Vitest
- **Modular** - Reusable form components and UI primitives

## Getting Started

```bash
# Install dependencies (from monorepo root)
pnpm install

# Start development server
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Tech Stack

| Technology          | Purpose                          |
| ------------------- | -------------------------------- |
| **Next.js 16**      | React framework with App Router  |
| **React 19**        | UI library with React Compiler   |
| **XState 5**        | State machines for checkout flow |
| **Tailwind CSS 4**  | Utility-first styling            |
| **Motion**          | Animations and transitions       |
| **React Hook Form** | Form state management            |
| **Zod**             | Runtime validation               |
| **Vitest**          | Unit testing                     |

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Landing page
└── checkout/
    ├── layout.tsx          # Checkout provider
    └── page.tsx            # Checkout flow

features/
└── checkout/               # Checkout feature module
    ├── components/         # Step components
    │   ├── CheckoutController.tsx
    │   ├── Stepper.tsx
    │   └── steps/          # Individual step forms
    └── hooks/              # Custom hooks

components/
├── forms/                  # Form input components
│   ├── card-input/         # Credit card input
│   ├── phone-input/        # Phone number input
│   └── form-field/         # Field wrapper
├── ui/                     # UI primitives
│   ├── button/
│   ├── surface/
│   └── typography/
└── layout/                 # Layout components
```

## Key Features

### Multi-Step Checkout

```tsx
// features/checkout/components/CheckoutController.tsx
import { CheckoutFlowStates } from '@repo/logic';
import { useCheckoutState } from '@repo/logic/react';

const { currentStep } = useCheckoutState();
// Steps: PersonalDetails → ShippingAddress → PaymentDetails → Confirmation → Completed
```

**Steps:**

1. Personal Information - Name, email, phone
2. Shipping Address - Delivery location
3. Payment Details - Credit card info
4. Confirmation - Review order
5. Completed - Success message

### Animated Transitions

```tsx
// Smooth step transitions with Motion
<AnimatePresence mode="wait">
  <motion.div key={currentStep} initial="initial" animate="animate" exit="exit" variants={variants}>
    <StepComponent />
  </motion.div>
</AnimatePresence>
```

### Form Components

Custom form inputs with built-in validation:

```tsx
import { CardInput, PhoneInput, CvvInput } from '@/components/forms';

<CardInput placeholder="1234 5678 9012 3456" />
// Auto-formats: #### #### #### ####

<PhoneInput placeholder="+1 (555) 123-4567" />
// Validates and formats phone numbers

<CvvInput placeholder="123" />
// 3-4 digit security code
```

### Type-Safe Forms

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalDetailsSchema } from '@repo/schema';

const form = useForm({
  resolver: zodResolver(PersonalDetailsSchema),
  // Full type safety and runtime validation
});
```

## Available Scripts

```bash
# Development
pnpm dev                    # Start dev server on port 3000

# Build
pnpm build                  # Production build
pnpm start                  # Start production server

# Code Quality
pnpm lint                   # ESLint check
pnpm check-types            # TypeScript check

# Testing
pnpm test                   # Run tests
pnpm test:watch             # Watch mode
pnpm test:coverage          # Coverage report
```

## Component Examples

### Button

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="lg">
  Continue
</Button>;

// Variants: primary, secondary, tertiary
// Sizes: sm, default, lg
```

### Surface (Card)

```tsx
import { Surface } from '@/components/ui';

<Surface padding="lg" shadow="md">
  <h2>Card Title</h2>
  <p>Card content</p>
</Surface>;
```

### Form Field

```tsx
import { FormField, Input } from '@/components/forms';

<FormField label="Email" error="Invalid email">
  <Input type="email" />
</FormField>;
```

## Styling

Uses Tailwind CSS 4 with custom utilities:

```tsx
import { cn } from '@/styles/utils';

// Merge class names intelligently
<div className={cn('text-base', isActive && 'text-blue-500')} />;
```

## State Management

Checkout state managed by XState machines:

```tsx
import { useCheckoutState, useCheckoutNavigation } from '@repo/logic/react';

const { currentStep, context } = useCheckoutState();
const { goBack, goToStep } = useCheckoutNavigation();

// Navigate
goBack();
goToStep(CheckoutFlowStates.PaymentDetailsStep);

// Access data
const personalData = context.personalDetailsData;
```

## Testing

Unit tests with Vitest and Testing Library:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

Run tests:

```bash
pnpm test                   # Run once
pnpm test:watch             # Watch mode
pnpm test:coverage          # With coverage
```

## Environment Variables

Create `.env.local`:

```bash
# Add environment variables as needed
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Best Practices

✅ **Server Components by default** - Use `'use client'` only when needed  
✅ **Feature-based structure** - Organize by domain (checkout, cart, etc.)  
✅ **Colocation** - Keep tests next to components  
✅ **Type safety** - Strict TypeScript configuration  
✅ **Atomic components** - Small, reusable UI primitives  
✅ **Validation** - Zod schemas from `@repo/schema`

## Performance

- **React Compiler** - Automatic memoization (React 19)
- **App Router** - Server-side rendering by default
- **Dynamic imports** - Code splitting for step components
- **Image optimization** - Next.js Image component
- **Font optimization** - Inter font with `next/font`

## Related Packages

- [`@repo/schema`](../../packages/schema/README.md) - Validation schemas
- [`@repo/logic`](../../packages/logic/README.md) - State machines and business logic

## License

Part of the unified-checkout-system monorepo.
