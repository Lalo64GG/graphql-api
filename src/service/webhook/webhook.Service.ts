import pool from "../../config/config";

// export const getMovies = async () => {
//     try {
//         const [result] = await pool.execute('SELECT * FROM movies');
//         await notifyDiscord('Se ha consultado la lista de películas'); // Envía una notificación a Discord
//         return result;
//     } catch (error) {
//         console.error('Error al obtener las películas:', error);
//         throw new Error('Ocurrió un error al obtener las películas');
//     }
// };

// export const getUsers = async () => {
//     try {
//         const [result] = await pool.execute('SELECT * FROM users');
//         await notifyDiscord('Se ha consultado la lista de usuarios'); // Envía una notificación a Discord
//         return result;
//     } catch (error) {
//         console.error('Error al obtener los usuarios:', error);
//         throw new Error('Ocurrió un error al obtener los usuarios');
//     }
// };

export const createWebhook = async (id_usuario: number, url: string) : Promise<number> => {
    try {
        const query = 'INSERT INTO webhook (id_usuario, url) VALUES (?,?)';
        const result : any = await pool.execute(query,[id_usuario, url]);
        return result[0].insertId;
    } catch (error : any) {
        throw new Error(error);
    }
}

export const createEvent = async (name: string) : Promise<number> => {
    try {
        const query = 'INSERT INTO event (name) VALUES (?)';
        const result : any = await pool.execute(query,[name]);
        return result[0].insertId;
    } catch (error : any) {
        throw new Error(error);
    }
}

export const createWebhookEvent = async (id_webhook: number, id_evento: number) : Promise<number> => {
    try {
        const query = 'INSERT INTO webhook_event (id_webhook, id_event) VALUES (?,?)';
        const result : any = await pool.execute(query,[id_webhook, id_evento]);
        return result[0].insertId;
    } catch (error : any) {
        throw new Error(error);
    }
}

export const getByEvent = async (id: number) => {
    try {
        const query = `SELECT wh.url, e.name FROM webhook_event AS we
        INNER JOIN event AS e
        ON we.id_event = e.id
        INNER JOIN webhook AS wh
        ON we.id_webhook = wh.id
        WHERE we.id_event = ?;`
        const [webhooks] = await pool.execute(query, [id]);
        return webhooks;
    } catch (error : any) {
        throw new Error(error);
    }
}