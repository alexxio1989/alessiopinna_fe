import { Corso } from "./corso";
import { DatiEvento } from "./datiEvento";
import { Utente } from "./utente";

export class Acquisto{
    id:number;
    utente:Utente;
    prodotto:Corso;
    quantita:number;
    dataAcquisto:Date;
    fromDetail:boolean;
    datiEvento:DatiEvento
}