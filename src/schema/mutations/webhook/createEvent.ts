import * as WebhookRepository from '../../../service/webhook/webhook.Service';
import { GraphQLError } from 'graphql';
import { notifyEvent } from '../../../utils/notifyDiscord';

export const createEvent = async (_: void, args: any) => {
    try {
        const { name } = args;
        const id = await WebhookRepository.createEvent(name);
        notifyEvent(1);
        return { 
            id,
            name
        }
    } catch (error: any) {
        throw new GraphQLError(error);
    }
}