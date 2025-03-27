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