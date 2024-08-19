import { syncDatabase } from '$lib/server/db/sync';

export const handle = async ({ event, resolve }) => {
    await syncDatabase();
    return resolve(event);
};