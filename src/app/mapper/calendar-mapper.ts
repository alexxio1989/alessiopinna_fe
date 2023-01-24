import { CalendarEvent } from "angular-calendar";
import { Acquisto } from "../dto/acquisto";
import { EventInfo } from "../dto/EventInfo";

export const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

export function  getEvent(acquisto:Acquisto, confirmed:boolean):CalendarEvent<EventInfo>{
    let startEvent:Date;
    if (typeof acquisto.datiEvento.dataInizio === 'string' || acquisto.datiEvento.dataInizio instanceof String){
      startEvent = new Date(acquisto.datiEvento.dataInizio)
    }

    let newDate= startEvent
    let endEvent = addHours(newDate,acquisto.quantita);
    return {
      title: acquisto.prodotto.nome,
      start: startEvent,
      end: endEvent,
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      meta:{
        id:acquisto.id,
        confirmed:confirmed,
        ore:acquisto.quantita,
        idEvent:acquisto.datiEvento.idEvent
      }
    };
}

  
export function addHours(date:Date, hours:number):Date {
  let newDate = date;
  newDate.setHours(date.getHours() + hours);
  return newDate;
}