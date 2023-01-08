import { CalendarEvent } from "angular-calendar";
import { EventInfo } from "../dto/EventInfo";
import { Prenotazione } from "../dto/prenotazione";

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

export function  getEvent(prenotazione:Prenotazione, confirmed:boolean):CalendarEvent<EventInfo>{
    let startEvent:Date;
    if (typeof prenotazione.dataPrenotazione === 'string' || prenotazione.dataPrenotazione instanceof String){
      startEvent = new Date(prenotazione.dataPrenotazione)
    }
    let endEvent = addHours(startEvent,prenotazione.qntOre);
    return {
      title: prenotazione.corso.titolo,
      start: startEvent,
      end: endEvent,
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      meta:{
        id:prenotazione.id,
        confirmed:confirmed,
        ore:prenotazione.qntOre
      }
    };
}

  
export function addHours(date:Date, hours:number):Date {
    date.setHours(date.getHours() + hours);
    return date;
}