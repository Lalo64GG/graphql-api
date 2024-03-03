import { GraphQLError } from "graphql";
import * as WebhookRepository from '../../../service/webhook/webhook.Service';

export const createWebhookEvent = async (_: void, args: any) => {
    try {
        const { id_webhook, id_event } = args;
        const id = await WebhookRepository.createWebhookEvent(id_webhook, id_event);
        return {
            id,
            id_webhook,
            id_event
        }
    } catch (error : any) {
        throw new GraphQLError(error);
    }
}