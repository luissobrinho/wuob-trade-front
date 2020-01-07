import { Injectable } from "@angular/core";
import { Adapter } from './adapter'

export interface RendimentoI {
  
}

export class Rendimento implements RendimentoI {

  constructor(
    public id: number,
    public user_id: number,
    public modalidade_id: number,
    public tipo_investimento_id: number,
    public valor: string,
    public status: number,
    public txn_id: string,
    public address: string,
    public confirms_needed: string,
    public checkout_url: string,
    public status_url: string,
    public qrcode_url: string,
    public timeout: number,
    public time_created: number,
    public time_expires: number,
    public time_completed: number,
    public amount: number,
    public amountf: string,
    public received: number,
    public receivedf: string,
    public recv_confirms: number,
    public status_text: string,
    public type: string,
    public coin: string,
    public vez: number,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date,
    public total_diario: number[],
  ){}
}

@Injectable({
  providedIn: 'root'
})

export class RendimentoAdapter implements Adapter<Rendimento> {
  adapt(item: any): Rendimento{
    return new Rendimento(
      item.id,
      item.user_id,
      item.modalidade_id,
      item.tipo_investimento_id,
      item.valor,
      item.status,
      item.txn_id,
      item.address,
      item.confirms_needed,
      item.checkout_url,
      item.status_url,
      item.qrcode_url,
      item.timeout,
      item.time_created,
      item.time_expires,
      item.time_completed,
      item.amount,
      item.amountf,
      item.received,
      item.receivedf,
      item.recv_confirms,
      item.status_text,
      item.type,
      item.coin,
      item.vez,
      new Date(item.created_at),
      new Date(item.updated_at),
      new Date(item.deleted_at),
      item.total_diario
    )
  } 

}