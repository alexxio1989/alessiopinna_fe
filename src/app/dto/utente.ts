import { Acquisto } from "./acquisto";
import { Dominio } from "./dominio";
import { TokenResponse } from "./tokenResponse";

export class Utente{
    id:number;
    username:string;
    skypeID:string;
    email:string;
    tipo:Dominio;
    photoUrl: string;
    acquisti: Acquisto[]
    tokens: TokenResponse[] = [];
    provider:string;
}