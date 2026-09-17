# Login Page Implementation

## Overview

This document describes the implementation of the login page using **Atomic Design** principles with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Architecture

The implementation follows the Atomic Design methodology:

```
components/
├── atoms/          # Basic building blocks
├── molecules/      # Simple combinations of atoms
├── organisms/      # Complex components
├── templates/      # Page layouts (reusable)
└── pages/          # Complete pages
```

## Component Hierarchy

### Atoms (Basic Elements)
- **Button**: Reusable button with primary/secondary variants
- **Input**: Text input with error state support
- **Checkbox**: Checkbox with optional label
- **Logo**: Code Connect logo component
- **Divider**: Horizontal divider with optional text
- **Link**: Styled anchor element

### Molecules (Simple Combinations)
- **InputField**: Label + Input + Error message
- **SocialButton**: Icon + Label button for social login
- **RememberMeCheckbox**: Checkbox + "Lembrar-me" + "Esqueceu a senha" link

### Organisms (Complex Components)
- **LoginForm**: Complete form with email, password, remember me, and submit
- **SocialLoginSection**: Divider + GitHub/Google login buttons
- **AuthBanner**: Banner image with logo overlay

### Templates (Reusable Layouts)
- **AuthTemplate**: Reusable layout for authentication pages
  - Left: Banner image
  - Right: Form content
  - Designed for reuse with registration page (different banner/form)

### Pages (Complete Views)
- **LoginPage**: Complete login page using AuthTemplate

## Features Implemented

✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
✅ **Accessibility**: Proper ARIA labels, keyboard navigation
✅ **Form Validation**: HTML5 validation with required fields
✅ **Error States**: Visual feedback for input errors
✅ **Social Login**: GitHub and Google OAuth buttons
✅ **Remember Me**: Persistent session checkbox
✅ **Forgot Password**: Link for password recovery
✅ **Reusability**: AuthTemplate ready for registration page

## Technologies Used

- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Vitest** - Unit testing
- **Testing Library** - Component testing

## Testing

All components have comprehensive test coverage:

```bash
# Run tests
pnpm test:web

# Run tests with coverage
pnpm test:web --coverage
```

Test Results: **22 tests passed** ✅

## Color Scheme

```javascript
primary: '#6EFF7B'      // Green (buttons, accents)
dark: '#0D1117'         // Background
dark-card: '#1C2128'    // Card background
dark-lighter: '#2D333B' // Input backgrounds
text-primary: '#FFFFFF' // Main text
text-secondary: '#8B949E' // Secondary text
```

## Usage

```tsx
import { LoginPage } from './components/pages/LoginPage'

function App() {
  return <LoginPage />
}
```

## Next Steps (Future)

When implementing the registration page:

1. Reuse `AuthTemplate` with different props:
   ```tsx
   <AuthTemplate
     bannerImage="/banner_register.png"
     title="Cadastro"
     subtitle="Crie sua conta"
     footerText="Já tem uma conta?"
     footerLinkText="Faça login!"
     onFooterLinkClick={handleLoginClick}
   >
     {/* Register form content */}
   </AuthTemplate>
   ```

2. Create `RegisterForm` organism with additional fields
3. Reuse existing atoms and molecules

## File Structure

```
apps/web/src/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Logo.tsx
│   │   ├── Divider.tsx
│   │   ├── Link.tsx
│   │   └── index.ts
│   ├── molecules/
│   │   ├── InputField.tsx
│   │   ├── InputField.test.tsx
│   │   ├── SocialButton.tsx
│   │   ├── RememberMeCheckbox.tsx
│   │   └── index.ts
│   ├── organisms/
│   │   ├── LoginForm.tsx
│   │   ├── LoginForm.test.tsx
│   │   ├── SocialLoginSection.tsx
│   │   ├── SocialLoginSection.test.tsx
│   │   ├── AuthBanner.tsx
│   │   └── index.ts
│   ├── templates/
│   │   ├── AuthTemplate.tsx
│   │   └── index.ts
│   └── pages/
│       ├── LoginPage.tsx
│       └── index.ts
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
└── index.css

public/
├── banner_login.png
├── Github.png
└── Google.png
```

## Development

```bash
# Start dev server
pnpm dev:web

# Run linter
pnpm lint:web

# Run tests
pnpm test:web

# Build for production
pnpm build:web
```

## Notes

- All components are **fully typed** with TypeScript
- **Tailwind CSS only** - no custom CSS files
- **Colocated tests** - test files next to components
- **Conventional Commits** - follow Git commit conventions
- Ready for **React Router** integration when needed
