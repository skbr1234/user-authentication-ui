module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',    // English
      'hi',    // Hindi
      'kn',    // Kannada
      'mr',    // Marathi
      'te',    // Telugu
      'ta',    // Tamil
      'ru',    // Russian
      'ar',    // Arabic (RTL)
      'de',    // German
      'fr',    // French
      'ja',    // Japanese
      'ko',    // Korean
      'ur',    // Urdu (RTL)
    ],
    localePath: './public/locales',
    localeDetection: true,
    // Keep numbers and dates in English format globally
    interpolation: {
      escapeValue: false,
    },
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};