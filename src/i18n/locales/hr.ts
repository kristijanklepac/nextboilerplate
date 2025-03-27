export default {
  common: {
    navigation: {
      home: 'Početna',
      counter: 'Brojač',
      about: 'O nama',
      logging: 'Logiranje',
      version: 'Verzija',
    },
    theme: {
      toggle: 'Promijeni temu',
      light: 'Svijetla tema',
      dark: 'Tamna tema',
    },
  },
  pages: {
    home: {
      title: 'Dobrodošli u Next App',
      description: 'Moderna Next.js aplikacija s TypeScriptom',
    },
    counter: {
      title: 'Zustand Upravljanje Stanjem',
      description: 'Ovaj primjer pokazuje upravljanje stanjem pomoću Zustanda.',
      currentValue: 'Trenutna Vrijednost',
    },
    about: {
      title: 'O Nama',
      description: 'Saznajte više o našem timu i misiji',
    },
  },
} as const; 