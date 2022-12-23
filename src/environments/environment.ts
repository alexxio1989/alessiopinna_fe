// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const mock = false
export const environment = {
  production: false,
  corso: mock ? "http://localhost:8080/corso" : "https://alessiopinna-be.herokuapp.com/corso",
  utente: mock ? "http://localhost:8080/utente" : "https://alessiopinna-be.herokuapp.com/utente",
  prenotazione: mock ? "http://localhost:8080/prenotazione" : "https://alessiopinna-be.herokuapp.com/prenotazione",
  tpl: mock ? "http://localhost:8080/tpl" : "https://alessiopinna-be.herokuapp.com/tpl",
  mock:false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
