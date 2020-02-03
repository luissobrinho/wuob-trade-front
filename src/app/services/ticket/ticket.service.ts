import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { Ticket } from 'src/app/models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
      this._TOKEN = sessionStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  getTicket():Promise<Object>{

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return this.api.get('pacote_tickets',{},header).toPromise();
    
  }

  buyTicket(ticket_id):Promise<Object> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return this.api.get('pacote_tickets/buy-ticket/'+ticket_id,{},header).toPromise();
  }
  
}
