export default {
  common: {
    navigation: {
      home: 'Accueil',
      counter: 'Compteur',
      about: 'À Propos',
      logging: 'Journalisation',
      version: 'Version',
      contact: 'Contact',
    },
    theme: {
      toggle: 'Changer le thème',
      light: 'Mode clair',
      dark: 'Mode sombre',
    },
  },
  form: {
    name: {
      label: 'Nom',
      placeholder: 'Entrez votre nom',
    },
    email: {
      label: 'Email',
      placeholder: 'Entrez votre email',
    },
    message: {
      label: 'Message',
      placeholder: 'Entrez votre message',
    },
    submit: 'Envoyer',
    submitting: 'Envoi en cours...',
    validation: {
      nameRequired: 'Le nom doit contenir au moins 2 caractères',
      emailInvalid: 'Adresse email invalide',
      messageRequired: 'Le message doit contenir au moins 10 caractères',
    },
  },
  pages: {
    home: {
      title: 'Bienvenue sur Next App',
      description: 'Une application Next.js moderne avec TypeScript',
    },
    counter: {
      title: 'Gestion d\'État avec Zustand',
      description: 'Cet exemple démontre la gestion d\'état globale avec Zustand.',
      currentValue: 'Valeur Actuelle',
    },
    about: {
      title: 'À Propos',
      description: 'En savoir plus sur notre équipe et notre mission',
    },
  },
} as const; 