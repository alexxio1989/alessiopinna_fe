import { Acquisto } from "../acquisto";
import { ResponseCore } from "../core/responseCore";

export class ResponseAcquisto extends ResponseCore{
    acquisti: Acquisto[];
    acquistiUtente: Acquisto[];
}