import { Dominio } from "./dominio";
import { Prenotazione } from "./prenotazione";
import { TokenResponse } from "./tokenResponse";

export class Utente{
    id:number;
    username:string;
    skypeID:string;
    email:string;
    tipo:Dominio;
    photoUrl: string;
    prenotazioni: Prenotazione[]
    tokens: TokenResponse[] = [];
    provider:string;
}