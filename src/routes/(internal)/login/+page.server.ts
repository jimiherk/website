import type { Actions } from './$types';

export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
    }
} satisfies Actions;