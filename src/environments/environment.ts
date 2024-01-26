export const environment = {
  production: true,
  firebase: {
    apiKey: process.env['NG_APP_FIREBASE_API_KEY']!,
    authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN']!,
    projectId: process.env['NG_APP_FIREBASE_PROJECT_ID']!,
    storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET']!,
    messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']!,
    appId: process.env['NG_APP_FIREBASE_APP_ID']!,
    measurementId: process.env['NG_APP_FIREBASE_MEASUREMENT_ID']!
  },
  encryption: {
    localStorageKey: process.env['NG_APP_ENCRYPTION_KEY_LOCAL_STORAGE']!,
    passwordKey: process.env['NG_APP_ENCRYPTION_KEY_PASSWORD']!
  },
  api: {
    baseUrlJSONPlaceholder: 'https://jsonplaceholder.typicode.com'
  }
};
