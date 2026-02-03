# Unified Checkout System

> Production-ready e-commerce checkout monorepo with XState, Next.js, and TypeScript

A comprehensive checkout system showcasing modern web development practices with state machines, type-safe validation, and reusable business logic.

## Why This Project?

- **Enterprise architecture** - Monorepo structure with shared packages
- **State-driven** - XState machines for predictable checkout flow
- **Type-safe** - End-to-end TypeScript with runtime validation
- **Framework-agnostic logic** - Core business logic works anywhere
- **Well-tested** - Unit and integration tests with high coverage
- **Best practices** - Clean architecture, separation of concerns

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build all packages
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) to view the checkout flow.

## Tech Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| **Turborepo**      | Monorepo build system           |
| **pnpm**           | Fast, efficient package manager |
| **TypeScript**     | Type safety across the stack    |
| **Next.js 16**     | React framework with App Router |
| **XState 5**       | State machines and actors       |
| **Zod**            | Schema validation               |
| **Tailwind CSS 4** | Utility-first styling           |
| **Vitest**         | Fast unit testing               |
| **Husky**          | Git hooks for quality checks    |
| **Commitlint**     | Conventional commits            |

## Project Structure

```
unified-checkout-system/
├── apps/
│   └── web/                    # Next.js application
│       ├── app/                # App Router pages
│       ├── components/         # UI components
│       └── features/           # Feature modules
│
├── packages/
│   ├── schema/                 # Zod validation schemas
│   │   └── src/
│   │       ├── personal-details.ts
│   │       ├── address.ts
│   │       ├── payment-details.ts
│   │       └── checkout.ts
│   │
│   ├── logic/                  # XState business logic
│   │   ├── src/core/           # Framework-agnostic
│   │   └── src/react/          # React bindings
│   │
│   ├── eslint-config/          # Shared ESLint configs
│   ├── typescript-config/      # Shared tsconfig.json
│   └── vitest-config/          # Shared test configs
│
├── turbo.json                  # Turborepo configuration
└── pnpm-workspace.yaml         # Workspace definition
```

## Packages

### Applications

#### [web](./apps/web/README.md)

Next.js checkout application with multi-step flow, animations, and form validation.

**Features:**

- Multi-step checkout wizard
- Animated step transitions
- Custom form components (card input, phone input, etc.)
- Responsive design
- Server-side rendering

### Shared Packages

#### [@repo/schema](./packages/schema/README.md)

Type-safe Zod schemas for checkout data validation.

**Exports:**

- `PersonalDetailsSchema` - User information
- `AddressSchema` - Billing/shipping addresses
- `PaymentDetailsSchema` - Credit card validation
- `CheckoutSchema` - Complete checkout data

**Features:**

- Runtime validation
- TypeScript type inference
- Custom transformations (trim, uppercase, format)
- Luhn algorithm for card validation

#### [@repo/logic](./packages/logic/README.md)

XState state machines for checkout flow management.

**Exports:**

- `checkoutFlowMachine` - Main orchestrator
- Step machines (personal details, shipping, payment)
- React hooks and context providers

**Features:**

- Predictable state management
- Framework-agnostic core
- Built-in retry logic
- Error handling
- Time-travel debugging

#### [@repo/eslint-config](./packages/eslint-config/)

Shared ESLint configurations.

**Configs:**

- `base.js` - Base rules
- `next.js` - Next.js specific
- `react-internal.js` - React libraries

#### [@repo/typescript-config](./packages/typescript-config/)

Shared TypeScript configurations.

**Configs:**

- `base.json` - Base settings
- `nextjs.json` - Next.js apps
- `react-library.json` - React libraries

#### [@repo/vitest-config](./packages/vitest-config/)

Shared Vitest test configurations.

**Configs:**

- `base.ts` - Base setup
- `next.ts` - Next.js apps
- `node.ts` - Node packages

## Available Scripts

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Start specific app
pnpm --filter web dev
```

### Building

```bash
# Build all apps and packages
pnpm build

# Build specific package
pnpm --filter @repo/schema build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm --filter web test:coverage

# Watch mode
pnpm --filter @repo/logic test:watch
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Type check all packages
pnpm check-types

# Format code
pnpm format
```

## Architecture

### Data Flow

```
User Input → Form Components → React Hook Form
                                    ↓
                          Zod Schema Validation
                          (@repo/schema)
                                    ↓
                          XState Step Machine
                          (@repo/logic)
                                    ↓
                          API Service
                                    ↓
                          Parent Flow Machine
                                    ↓
                          Next Step
```

### State Management

```
CheckoutFlowMachine (Parent)
├── PersonalDetailsMachine (Child)
├── ShippingAddressMachine (Child)
└── PaymentDetailsMachine (Child)
```

Each step machine:

1. Validates input with Zod
2. Saves data via API
3. Handles errors with retry logic
4. Outputs validated data to parent

## Checkout Flow

**Steps:**

1. **Personal Details** - Title, name, email, phone
2. **Shipping Address** - Street, city, postal code, country
3. **Payment Details** - Card number (Luhn), expiry, CVV
4. **Confirmation** - Review all information
5. **Completed** - Success message

**Navigation:**

- Linear progression (1 → 2 → 3 → 4 → 5)
- Back button to previous step
- Jump to any completed step

## Git Workflow

### Commit Convention

Using [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(web): add payment step animation
fix(schema): correct postal code regex
docs(logic): update state machine diagram
test(web): add card input tests
```

### Git Hooks

- **pre-commit**: Lint staged files
- **commit-msg**: Validate commit message format

## Development Guidelines

### Adding a New Package

1. Create package directory in `packages/`
2. Add `package.json` with workspace dependencies
3. Export from `index.ts`
4. Add README.md
5. Update root README (this file)

### Adding a New Feature

1. Create feature directory in `apps/web/features/`
2. Implement components, hooks, and logic
3. Add tests
4. Update feature documentation

### Testing Strategy

- **Unit tests**: Individual components and functions
- **Integration tests**: State machine flows
- **Component tests**: React Testing Library

**Coverage goals:**

- Critical paths: 100%
- Business logic: 90%+
- UI components: 80%+

## Benefits of This Architecture

✅ **Reusability** - Share schemas and logic across projects  
✅ **Maintainability** - Change validation in one place  
✅ **Type Safety** - Compile-time errors for invalid data  
✅ **Testability** - Isolated, easy-to-test units  
✅ **Scalability** - Add features without breaking existing code  
✅ **DX** - Great developer experience with IntelliSense

## Performance

- **Turborepo caching** - Only rebuild what changed
- **pnpm workspaces** - Efficient dependency management
- **Incremental builds** - Fast development cycles
- **Code splitting** - Optimized bundle sizes
- **Tree shaking** - Remove unused code

## Requirements

- **Node.js** >= 18
- **pnpm** >= 9.0.0

## Environment

```bash
# Install pnpm
npm install -g pnpm

# Verify installation
node --version  # >= 18
pnpm --version  # >= 9.0.0
```

## License

This is a portfolio project demonstrating modern web development practices.

---

**Built with modern tooling and best practices for production-ready e-commerce**
