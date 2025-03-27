export default {
  common: {
    navigation: {
      home: 'Početna',
      counter: 'Brojač',
      about: 'O nama',
      logging: 'Zapisnik',
      version: 'Verzija',
      contact: 'Kontakt',
    },
    theme: {
      toggle: 'Promijeni temu',
      light: 'Svijetla tema',
      dark: 'Tamna tema',
    },
  },
  form: {
    name: {
      label: 'Ime',
      placeholder: 'Unesite vaše ime',
    },
    email: {
      label: 'Email',
      placeholder: 'Unesite vaš email',
    },
    message: {
      label: 'Poruka',
      placeholder: 'Unesite vašu poruku',
    },
    submit: 'Pošalji',
    submitting: 'Slanje...',
    validation: {
      nameRequired: 'Ime mora imati najmanje 2 znaka',
      emailInvalid: 'Nevažeća email adresa',
      messageRequired: 'Poruka mora imati najmanje 10 znakova',
    },
  },
  pages: {
    home: {
      title: 'Dobrodošli u Next App',
      description: 'Moderna Next.js aplikacija s TypeScriptom',
    },
    counter: {
      title: 'Upravljanje stanjem pomoću Zustanda',
      description: 'Ovaj primjer pokazuje globalno upravljanje stanjem pomoću Zustanda.',
      currentValue: 'Trenutna vrijednost',
    },
    about: {
      title: 'O nama',
      description: 'Saznajte više o našem timu i misiji',
    },
  },
} as const; 