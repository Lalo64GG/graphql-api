import { GraphQLError } from "graphql"
import * as WebhookRepository from '../../../service/webhook/webhook.Service';

export const createWebhook = async (_: void, args: any) => {
    try {
        const { id_usuario, url} = args;
        const id =await WebhookRepository.createWebhook(id_usuario, url);
        return {
            id,
            id_usuario,
            url
        }
    } catch (error: any) {
        throw new GraphQLError(error);
    }
}