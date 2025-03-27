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
  form: {
    name: {
      label: 'Nombre',
      placeholder: 'Ingrese su nombre',
    },
    email: {
      label: 'Correo electrónico',
      placeholder: 'Ingrese su correo electrónico',
    },
    message: {
      label: 'Mensaje',
      placeholder: 'Ingrese su mensaje',
    },
    submit: 'Enviar',
    submitting: 'Enviando...',
    validation: {
      nameRequired: 'El nombre debe tener al menos 2 caracteres',
      emailInvalid: 'Dirección de correo electrónico inválida',
      messageRequired: 'El mensaje debe tener al menos 10 caracteres',
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
      description: 'Conozca más sobre nuestro equipo y misión',
    },
  },
} as const; 