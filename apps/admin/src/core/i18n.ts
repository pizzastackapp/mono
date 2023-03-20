import polyglotI18nProvider from 'ra-i18n-polyglot';
import ua from 'ra-language-ukrainian';

const lang = {
  ra: {
    ...ua.ra,
    configurable: {
      ...ua.ra.configurable,
      customize: 'Customize',
      configureMode: 'Configure this page',
      inspector: {
        title: 'Inspector',
        content: 'Hover the application UI elements to configure them',
        reset: 'Reset Settings',
      },
      SimpleList: {
        primaryText: 'Primary text',
        secondaryText: 'Secondary text',
        tertiaryText: 'Tertiary text',
      },
    },
  },
};

export const i18nProvider = polyglotI18nProvider(() => lang, 'ua');
