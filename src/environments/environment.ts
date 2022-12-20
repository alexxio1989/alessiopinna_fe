// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const mock = false
export const environment = {
  production: false,
  getCorsi: mock ? "http://localhost:8080/corso/all" : "https://alessiopinna-be.herokuapp.com/corso/all",
  signin: mock ? "http://localhost:8080/utente/signin" : "https://alessiopinna-be.herokuapp.com/utente/signin",
  login: mock ? "http://localhost:8080/utente/login" : "https://alessiopinna-be.herokuapp.com/utente/login",
  mock:true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
