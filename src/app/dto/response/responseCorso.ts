import { Corso } from "../corso";
import { ResponseCore } from "../core/responseCore";

export class ResponseCorso extends ResponseCore{
    corsi:Corso[]
    success:boolean
}