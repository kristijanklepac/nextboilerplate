export default {
  common: {
    navigation: {
      home: 'Home',
      counter: 'Counter',
      about: 'About Us',
      logging: 'Logging',
      version: 'Version',
      contact: 'Contact',
    },
    theme: {
      toggle: 'Toggle theme',
      light: 'Light mode',
      dark: 'Dark mode',
    },
  },
  pages: {
    home: {
      title: 'Welcome to Next App',
      description: 'A modern Next.js application with TypeScript',
    },
    counter: {
      title: 'Zustand State Management',
      description: 'This example demonstrates global state management with Zustand.',
      currentValue: 'Current Value',
    },
    about: {
      title: 'About Us',
      description: 'Learn more about our team and mission',
    },
  },
} as const; 