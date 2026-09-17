# Component Tree Structure

```
LoginPage
└── AuthTemplate (Reusable for Login/Register)
    ├── AuthBanner (Left Side)
    │   ├── <img> (banner_login.png)
    │   └── Logo
    │       ├── <svg> (icon)
    │       └── <span> "code" + "connect"
    │
    └── Form Section (Right Side)
        ├── Header
        │   ├── <h1> "Login"
        │   └── <p> "Boas-vindas! Faça seu login"
        │
        ├── LoginForm
        │   ├── InputField (Email)
        │   │   ├── <label> "Email ou usuário"
        │   │   └── Input
        │   │
        │   ├── InputField (Password)
        │   │   ├── <label> "Senha"
        │   │   └── Input (type="password")
        │   │
        │   ├── RememberMeCheckbox
        │   │   ├── Checkbox ("Lembrar-me")
        │   │   └── Link ("Esqueceu a senha")
        │   │
        │   └── Button ("Login →")
        │
        ├── SocialLoginSection
        │   ├── Divider ("ou entre com outras contas")
        │   ├── SocialButton (GitHub)
        │   │   ├── <img> (Github.png)
        │   │   └── <span> "GitHub"
        │   │
        │   └── SocialButton (Google)
        │       ├── <img> (Google.png)
        │       └── <span> "Gmail"
        │
        └── Footer
            └── Link ("Crie seu cadastro! →")
```

## Atomic Design Layers

### 🔹 **Atoms** (6 components)
- Button, Input, Checkbox, Logo, Divider, Link

### 🔸 **Molecules** (3 components)
- InputField, SocialButton, RememberMeCheckbox

### 🔶 **Organisms** (3 components)
- LoginForm, SocialLoginSection, AuthBanner

### 🔷 **Templates** (1 component)
- AuthTemplate (Reusable!)

### 🔵 **Pages** (1 component)
- LoginPage

---

## Reusability Example

When creating the **Registration Page**:

```
RegisterPage
└── AuthTemplate (SAME TEMPLATE!)
    ├── AuthBanner
    │   └── <img> (banner_register.png) ← Different banner
    │
    └── RegisterForm ← New form with different fields
        ├── InputField (Name)
        ├── InputField (Email)
        ├── InputField (Password)
        ├── InputField (Confirm Password)
        ├── Checkbox (Terms & Conditions)
        └── Button ("Criar conta")
```

**Reused Components**: AuthTemplate, InputField, Checkbox, Button, AuthBanner, Link
**New Components**: Only RegisterForm organism!
