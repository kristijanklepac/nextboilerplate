export default {
  common: {
    navigation: {
      home: 'Inicio',
      counter: 'Contador',
      about: 'Sobre Nosotros',
      logging: 'Registro',
      version: 'Versión',
      contact: 'Contacto',
    },
    theme: {
      toggle: 'Cambiar tema',
      light: 'Modo claro',
      dark: 'Modo oscuro',
    },
  },
  pages: {
    home: {
      title: 'Bienvenido a Next App',
      description: 'Una aplicación moderna de Next.js con TypeScript',
    },
    counter: {
      title: 'Gestión de Estado con Zustand',
      description: 'Este ejemplo demuestra la gestión de estado global con Zustand.',
      currentValue: 'Valor Actual',
    },
    about: {
      title: 'Sobre Nosotros',
      description: 'Aprende más sobre nuestro equipo y misión',
    },
  },
} as const; 