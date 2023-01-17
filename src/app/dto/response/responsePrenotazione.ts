import { ResponseCore } from "../core/responseCore";
import { Prenotazione } from "../prenotazione";

export class ResponsePrenotazione extends ResponseCore{
    prenotazioni: Prenotazione[];
    prenotazioniUtente: Prenotazione[];
}