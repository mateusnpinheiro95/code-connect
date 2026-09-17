# Registration Page - Planning Document

## 📋 Overview

**Feature**: Registration Page  
**Status**: 📝 Planning  
**Created**: 2026-09-17

## 🎯 Objectives

Create a user registration page that follows the same design patterns as the login page, maximizing component reusability.

## ✨ Requirements

### Functional Requirements
- [ ] Full name input field
- [ ] Email input field with validation
- [ ] Username input field
- [ ] Password input field with strength indicator
- [ ] Confirm password input field
- [ ] Terms & Conditions checkbox
- [ ] Privacy Policy checkbox
- [ ] Registration button
- [ ] Social registration options (GitHub, Google)
- [ ] Link back to login page
- [ ] Client-side validation
- [ ] Password match validation

### Non-Functional Requirements
- [ ] Mobile-first responsive design
- [ ] Accessibility (WCAG 2.1 Level AA)
- [ ] Fast load time (< 3s)
- [ ] Cross-browser compatibility
- [ ] Unit test coverage (> 80%)
- [ ] Password strength feedback (weak/medium/strong)

## 🎨 Design System

### Reuse Login Design
- Same color palette (#6EFF7B primary, dark theme)
- Same typography
- Same spacing and layout patterns
- Same component styling

### New Elements
- Password strength indicator (visual bar)
- Terms & Privacy checkboxes (stacked)
- Different banner image (`banner_register.png`)

## 🏗️ Architecture

### Reusable Components (from Login)

✅ **Reuse** (no changes needed):
- `AuthTemplate` - Same 2-column layout
- `InputField` - Email, username, password fields
- `Button` - Registration button
- `Checkbox` - Terms and Privacy
- `Logo` - Same logo
- `Divider` - "ou cadastre-se com"
- `Link` - Link to login
- `SocialButton` - GitHub, Google
- `SocialLoginSection` - Social registration options
- `AuthBanner` - With different banner image

### New Components to Create

#### Atoms (1 new)
1. **PasswordStrengthBar** - Visual password strength indicator

#### Molecules (2 new)
1. **PasswordFieldWithStrength** - InputField + PasswordStrengthBar
2. **TermsCheckboxes** - Two checkboxes (Terms + Privacy) stacked

#### Organisms (1 new)
1. **RegisterForm** - Complete registration form

#### Pages (1 new)
1. **RegisterPage** - Complete registration page

### Component Hierarchy

```
RegisterPage
└── AuthTemplate (✅ REUSED)
    ├── AuthBanner (✅ REUSED)
    │   ├── <img> (banner_register.png) ← New image
    │   └── Logo (✅ REUSED)
    │
    └── Form Section
        ├── Header
        │   ├── <h1> "Cadastro"
        │   └── <p> "Crie sua conta no Code Connect"
        │
        ├── RegisterForm (🆕 NEW)
        │   ├── InputField (✅ REUSED) - Nome completo
        │   ├── InputField (✅ REUSED) - Email
        │   ├── InputField (✅ REUSED) - Nome de usuário
        │   ├── PasswordFieldWithStrength (🆕 NEW)
        │   │   ├── InputField (✅ REUSED)
        │   │   └── PasswordStrengthBar (🆕 NEW)
        │   ├── InputField (✅ REUSED) - Confirmar senha
        │   ├── TermsCheckboxes (🆕 NEW)
        │   │   ├── Checkbox (✅ REUSED)
        │   │   └── Checkbox (✅ REUSED)
        │   └── Button (✅ REUSED) - "Criar conta →"
        │
        ├── SocialLoginSection (✅ REUSED)
        │   ├── Divider (✅ REUSED)
        │   ├── SocialButton (✅ REUSED) - GitHub
        │   └── SocialButton (✅ REUSED) - Google
        │
        └── Footer
            └── Link (✅ REUSED) - "Já tem conta? Faça login!"
```

## 🧪 Testing Strategy

### Unit Tests
- **PasswordStrengthBar**: Test weak/medium/strong states
- **PasswordFieldWithStrength**: Test integration with strength indicator
- **TermsCheckboxes**: Test both checkboxes functionality
- **RegisterForm**: Test form validation, password match, submission

### Test Coverage Goals
- New components: 100%
- Integration: 85%+
- Overall: Maintain 80%+

## 🔐 Validation Rules

### Client-Side Validation
```typescript
// Email
- Required
- Valid email format (regex)

// Username
- Required
- 3-20 characters
- Alphanumeric + underscore only
- No spaces

// Password
- Required
- Min 8 characters
- At least 1 uppercase
- At least 1 lowercase
- At least 1 number
- At least 1 special character

// Confirm Password
- Required
- Must match password field

// Terms & Privacy
- Both must be checked to enable submit button
```

### Password Strength Logic
```typescript
Weak: < 8 chars or only lowercase
Medium: 8+ chars, mixed case
Strong: 12+ chars, mixed case, numbers, special chars
```

## 📦 Dependencies

### New Dependencies
- None (use existing stack)

### Assets Needed
- `banner_register.png` - Registration banner image

## 🚀 Implementation Steps

### Phase 1: New Atoms
1. [ ] Create `PasswordStrengthBar` atom
2. [ ] Write tests for `PasswordStrengthBar`

### Phase 2: New Molecules
3. [ ] Create `PasswordFieldWithStrength` molecule
4. [ ] Create `TermsCheckboxes` molecule
5. [ ] Write tests for both molecules

### Phase 3: New Organisms
6. [ ] Create `RegisterForm` organism
7. [ ] Implement validation logic
8. [ ] Implement password match check
9. [ ] Write tests for `RegisterForm`

### Phase 4: Page Assembly
10. [ ] Create `RegisterPage` using `AuthTemplate`
11. [ ] Add banner_register.png
12. [ ] Test responsive behavior
13. [ ] Verify accessibility

### Phase 5: Integration
14. [ ] Add routing between Login and Register
15. [ ] Test complete user flow
16. [ ] Run full test suite

## 🎯 Success Criteria

- [ ] All functional requirements met
- [ ] Password strength indicator works correctly
- [ ] Form validation prevents invalid submissions
- [ ] Password match validation works
- [ ] Terms checkboxes enforce requirement
- [ ] Responsive on all devices
- [ ] All tests passing (target: 30+ tests total)
- [ ] No accessibility violations
- [ ] Reuses maximum number of existing components
- [ ] Follows same code patterns as login page

## 📊 Reusability Metrics

**Target**: Reuse 80%+ of existing components

- ✅ Reused: 10 components (AuthTemplate, AuthBanner, Logo, InputField, Button, Checkbox, Divider, Link, SocialButton, SocialLoginSection)
- 🆕 New: 4 components (PasswordStrengthBar, PasswordFieldWithStrength, TermsCheckboxes, RegisterForm)
- 📈 Reusability: 10/14 = **71%** (good!)

## 🔮 Future Enhancements

- [ ] Email verification flow
- [ ] Username availability check (API call)
- [ ] CAPTCHA for bot protection
- [ ] Profile picture upload
- [ ] Social registration OAuth flow
- [ ] Progressive disclosure (multi-step form)
- [ ] Password requirements checklist UI
- [ ] Real-time username validation

## 📝 Notes

- Keep same visual style as login page
- Maintain code consistency
- Document any new patterns
- Update AGENTS.md if new conventions emerge
