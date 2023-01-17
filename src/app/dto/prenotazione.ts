import { Corso } from "./corso";
import { Utente } from "./utente";

export class Prenotazione{
    id:number;
    idEvent:string;
    utente:Utente;
    corso:Corso;
    qntOre:number;
    dataPrenotazione:Date;
    fromDetail:boolean;
}