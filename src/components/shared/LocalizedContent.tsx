import { useTranslation } from 'react-i18next';

export function LocalizedContent() {
  const { t } = useTranslation();

  return (
    <div>
      <span data-testid="current-language">{t('language')}</span>
      <h1 data-testid="welcome-text">{t('welcome')}</h1>
      {/* ... other content ... */}
    </div>
  );
} 