# Implementation Plan: Login & Signup Pages

## Backend Audit Summary

### Endpoints
| Method | URL | Purpose |
|--------|-----|---------|
| POST | `/api/v1/auth/signup` | Register new user |
| POST | `/api/v1/auth/login` | Login (sets HTTP-only cookie) |
| POST | `/api/v1/auth/logout` | Logout (clears cookie) |

### Signup Fields (ALL required)
| Field | Type | Validation |
|-------|------|------------|
| `firstName` | string | Min 3 chars |
| `lastName` | string | Min 3 chars |
| `email` | string | Valid email |
| `phoneNumber` | string | Exactly 11 digits, starts with "0" |
| `role` | enum | `"buyer"` or `"farmer"` |
| `accountType` | enum | `"INDIVIDUAL"` or `"BUSINESS"` |
| `password` | string | Min 8 chars, uppercase, lowercase, number, special char |

### Login Fields
| Field | Type | Validation |
|-------|------|------------|
| `email` | string | Valid email |
| `password` | string | Required |

### Token Handling
- HTTP-only cookie named `"token"`
- `sameSite: "strict"`, `secure: true` in production
- 7-day expiry
- Also supports `Authorization: Bearer` header

### Error Response Formats
- Zod errors: `{ success: false, message: ["error1", "error2"] }`
- App errors: `{ success: false, message: "error string" }`

---

## Design Analysis

### Desktop Signup (register_desktop.html)
- **Left half:** Hero image with gradient overlay, logo, headline "Grow your business with smart connections.", subtitle
- **Right half:** White card with form - "Create Account", role selector (Farmer/Buyer), fields: Full Name, Email, Phone (+91 prefix), Password, "Create Account" button, "Already have an account? Log in" link

### Desktop Login (same split layout as Signup)
- **Left half:** Hero image with gradient overlay, logo, headline "Grow your business with smart connections.", subtitle
- **Right half:** White card with form - "Welcome Back", Email field with icon, Password field with icon + "Forgot Password?" link, "Remember me" checkbox, "Sign In" button, "Don't have an account? Sign up as a Farmer" link

### Mobile Signup (register_mobile.html)
- Centered card
- Logo + "Join Cropsmarket" heading
- Role selector with icons (Farmer/Buyer)
- Fields with left icons: Full Name (person), Email (mail), Password (lock)
- Terms checkbox
- "Create Account" button
- "Already have an account? Sign in" link

### Mobile Login (login_mobile.html)
- Centered card
- Top green gradient bar
- Logo + "Welcome Back" heading
- Email field with mail icon, Password field with lock icon + "Forgot Password?"
- "Remember me" checkbox
- "Sign In" button
- "Don't have an account? Sign up as a Farmer" link

---

## Implementation Plan

### Step 1: Install Zod
```bash
bun add zod
```

### Step 2: Create Environment File
**File:** `client/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8090/api/v1
```

### Step 3: Create Zod Validation Schemas
**File:** `client/app/schema/auth.schema.ts`
- Mirror backend validation exactly
- `signupSchema` with all 7 fields
- `loginSchema` with email + password
- Export TypeScript types

### Step 4: Create Auth API Service
**File:** `client/app/services/auth.service.ts`
- `signup(data)` → POST `/api/v1/auth/signup`
- `login(data)` → POST `/api/v1/auth/login`
- `logout()` → POST `/api/v1/auth/logout`
- Use `credentials: "include"` for cookie handling
- Handle both error response formats

### Step 5: Create Toast Component
**File:** `client/app/components/ui/Toast.tsx`
- Simple toast notification system
- Supports success, error, info types
- Auto-dismiss after 5 seconds

### Step 6: Create Auth Store (Zustand)
**File:** `client/app/store/authStore.ts`
- Store user data and auth state
- Persist user data in cookie (not localStorage)
- Actions: setUser, clearUser

### Step 7: Create Signup Page
**File:** `client/app/(auth)/signup/page.tsx`
- Desktop: Split layout (left hero, right form)
- Mobile: Centered card
- Role toggle: Farmer / Buyer tabs
- Form fields: Full Name, Email, Phone (+91), Password
- Terms checkbox
- Zod validation before submit
- Toast for errors
- Redirect to login on success

### Step 8: Create Login Page
**File:** `client/app/(auth)/login/page.tsx`
- Desktop: Centered card with hero background
- Mobile: Centered card
- Email + Password fields with icons
- "Remember me" checkbox
- "Forgot Password?" link
- Zod validation before submit
- Toast for errors
- Set cookie on success, redirect to home

---

## File Impact Summary

| Action | File |
|--------|------|
| **Install** | `zod` package |
| **Create** | `client/.env.local` |
| **Create** | `client/app/schema/auth.schema.ts` |
| **Create** | `client/app/services/auth.service.ts` |
| **Create** | `client/app/components/ui/Toast.tsx` |
| **Create** | `client/app/store/authStore.ts` |
| **Create** | `client/app/(auth)/signup/page.tsx` |
| **Create** | `client/app/(auth)/login/page.tsx` |
| **No touch** | `server/` folder |

---

## Validation Rules (Matching Backend)

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character: `!@#$%^&*()_\-+={}[]|;:'",.<>?/~`

### Phone Number
- Exactly 11 digits
- Must start with "0"
- Only numeric characters

### Email
- Valid email format

### Name Fields
- Minimum 3 characters

---

## Error Handling Strategy

### Toast Messages (Generic but Informative)
| Backend Error | Toast Message |
|---------------|---------------|
| Validation errors (array) | "Please check your input and try again" |
| Duplicate account | "An account with this email already exists" |
| Invalid credentials | "Invalid email or password" |
| Server error | "Something went wrong. Please try again later" |
| Network error | "Unable to connect. Please check your connection" |

### Form-Level Validation
- Show inline errors below each field
- Validate on blur and on submit
- Disable submit button while loading

---

## Auth Token Storage

The backend sets an HTTP-only cookie which the browser handles automatically. For client-side auth state:

1. On login success: Store user data in a cookie (non-httpOnly) for client-side access
2. On logout: Clear the client-side cookie
3. For API calls: Use `credentials: "include"` to send the HTTP-only cookie

---

Awaiting your approval to proceed.
