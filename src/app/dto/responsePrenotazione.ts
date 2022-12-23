import { Prenotazione } from "./prenotazione";

export class ResponsePrenotazione{
    prenotazioni: Prenotazione[];
    success:boolean;
    error:string;
}