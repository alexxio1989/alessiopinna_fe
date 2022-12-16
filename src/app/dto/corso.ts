import { Dominio } from "./dominio";

export class Corso{
    id:number;
    titolo:string;
    descrizione:string;
    imgName:string;
    tipo:Dominio;
    giorniOrari:string;
    prezzo:number;
    dataCreazione:Date;
}