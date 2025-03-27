# Quick Start Guide

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

## 5-Minute Setup

1. **Clone and Install**

```bash
git clone https://github.com/kristijanklepac/nextboilerplate.git
cd nextboilerplate
npm install
```

2. **Start Development**

```bash
npm run dev
```

Visit `http://localhost:3000` - You're ready to go! 🚀

## Common Commands

```bash
npm run dev          # Start development
npm run test        # Run tests
npm run commit      # Commit changes
npm run build       # Production build
```

## Key Features at a Glance

### 🎨 Theme Switching

```tsx
import { ThemeToggle } from '@/components/shared/ThemeToggle';
<ThemeToggle />  // Adds a theme toggle button
```

### 🌐 Language Switching

```tsx
import { useLanguageStore } from '@/stores/languageStore';
const { language, setLanguage } = useLanguageStore();
```

### 📦 Component Usage

```tsx
import { Button } from '@/components/ui/button';
<Button variant="primary">Click Me</Button>
```

## Next Steps

- Check `USAGE.md` for detailed documentation
- Review `.env.example` for environment setup
- Visit `/docs` in the app for component documentation
