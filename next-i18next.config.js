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
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};