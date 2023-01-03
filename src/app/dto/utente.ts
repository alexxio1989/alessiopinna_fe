import { Dominio } from "./dominio";
import { Prenotazione } from "./prenotazione";

export class Utente{
    id:number;
    username:string;
    skypeID:string;
    email:string;
    tipo:Dominio;
    photoUrl: string;
    prenotazioni: Prenotazione[]
}