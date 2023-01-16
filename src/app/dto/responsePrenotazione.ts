import { Prenotazione } from "./prenotazione";

export class ResponsePrenotazione{
    prenotazioni: Prenotazione[];
    prenotazioniUtente: Prenotazione[];
    success:boolean;
    error:string;
    code:number;
}