# @repo/schema

> Type-safe Zod schemas for checkout validation

Centralized validation schemas for the checkout system with runtime validation and automatic TypeScript type inference.

## Why This Package?

- **Single source of truth** - One place for all validation rules
- **Type safety** - Automatic TypeScript types from schemas
- **Runtime validation** - Catch invalid data before it causes issues
- **Auto-transformations** - Normalize data (trim, uppercase, format)

## Usage

```typescript
import { CheckoutSchema, type Checkout } from '@repo/schema';

const result = CheckoutSchema.safeParse(formData);

if (result.success) {
  const data: Checkout = result.data;
  // All fields validated and transformed
} else {
  console.error(result.error.issues);
}
```

## Available Schemas

### PersonalDetailsSchema

```typescript
import { PersonalDetailsSchema, type PersonalDetails } from '@repo/schema';
```

| Field         | Type                                      | Validation              |
| ------------- | ----------------------------------------- | ----------------------- |
| `title`       | `'mr' \| 'mrs' \| 'ms' \| 'dr' \| 'prof'` | Required                |
| `firstName`   | `string`                                  | 2-50 chars, trimmed     |
| `lastName`    | `string`                                  | 2-50 chars, trimmed     |
| `email`       | `string`                                  | Valid email, lowercased |
| `phoneNumber` | `string`                                  | 10-20 chars             |

### AddressSchema

```typescript
import { AddressSchema, type Address } from '@repo/schema';
```

| Field         | Validation                  |
| ------------- | --------------------------- |
| `street`      | 2-100 chars                 |
| `houseNumber` | Alphanumeric (e.g., "123A") |
| `city`        | 2-50 chars                  |
| `postalCode`  | 3-10 chars, uppercased      |
| `country`     | 2-50 chars                  |

### PaymentDetailsSchema

```typescript
import { PaymentDetailsSchema, type PaymentDetails } from '@repo/schema';
```

| Field            | Validation                   |
| ---------------- | ---------------------------- |
| `cardNumber`     | 13-19 digits, Luhn validated |
| `cardHolderName` | 3-50 chars, uppercased       |
| `expiryDate`     | MM/YY, not expired           |
| `cvv`            | 3-4 digits                   |

**Features**: Luhn algorithm validation, expiry date checking, automatic formatting

### CheckoutSchema

Combines all schemas above:

```typescript
import { CheckoutSchema, type Checkout } from '@repo/schema';

// Contains: personalDetails, billingAddress, shippingAddress, paymentDetails
```

## Key Features

**Automatic Transformations:**

```typescript
// Input
{
  email: '  USER@EXAMPLE.COM  ';
}

// Output
{
  email: 'user@example.com';
} // trimmed + lowercased
```

**Helpful Error Messages:**

```typescript
AddressSchema.safeParse({ street: 'A' });
// Error: "At least 2 characters"
```

## Best Practices

Use `safeParse` for user input:

```typescript
const result = schema.safeParse(data);
if (!result.success) {
  // Handle errors
}
```

Validate at API boundaries:

```typescript
export async function POST(request: Request) {
  const body = await request.json();
  const result = CheckoutSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: result.error.format() }, { status: 400 });
  }

  await processCheckout(result.data);
}
```

## Development

```bash
# Type check
pnpm run check-types

# Lint
pnpm run lint
```

**Adding schemas**: Create file in `src/`, define with Zod, export schema + type, add to `src/index.ts`
