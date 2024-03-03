import * as WebhookRepository from '../service/webhook/webhook.Service';
import { GraphQLError } from 'graphql';

export const notifyEvent = async (id: number) => {
  try {
    const webhooks : any = await WebhookRepository.getByEvent(id);
    webhooks.map( async (webhook : any) => {
      const body = {
        content: webhook.name
      }
      const req = {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(body)
      }
      console.log(webhook.url);
      const res = await fetch(webhook.url, req);
      
      if(!res.ok){
        throw new Error('Error al notificar');
      }

      console.log('Ha sido notificado');
    })
  } catch (error : any) {
    throw new GraphQLError(error);
  }
}