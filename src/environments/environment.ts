// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://api.wuob.trade/api/v1/',
  firebaseConfig: {
    apiKey: "AIzaSyC-gsIybRxDiDOmUGFJheHDEOSgHG-6qs4",
    authDomain: "trade-dbbf3.firebaseapp.com",
    databaseURL: "https://trade-dbbf3.firebaseio.com",
    projectId: "trade-dbbf3",
    storageBucket: "",
    messagingSenderId: "615076606227",
    appId: "1:615076606227:web:b2dd9ae3a71f8149e3eae6"
  },
  urlAngular: 'http://localhost:4200/authentication/signup'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
