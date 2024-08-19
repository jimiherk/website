import type { Actions } from './$types';
import { User } from "$lib/server/db/models";
import { compare, hash, genSalt } from 'bcrypt';
import { jwtSecret, saltRounds } from "$lib/server/config.json";
import jwt from 'jsonwebtoken';

export const actions = {
    default: async ({ request }) => {
        let data = await request.formData();

        let user = await User.findOne({ where: { name: data.get('username') } });

        if (!user) {
            let salt = await genSalt(saltRounds);
            let hashedPassword = await hash(data.get('password') as string, salt);
            let newUser = await User.create({
                name: data.get('username'),
                password: hashedPassword
            });

            return { status: 201, body: { token: jwt.sign(newUser.get('name') as string, jwtSecret) } };
        }

        let userPassword = user.get('password')!.toString();

        let isPasswordCorrect = await compare(data.get('password') as string, userPassword);

        return isPasswordCorrect
            ? { status: 200, body: { token: jwt.sign(user.get('name') as string, jwtSecret) }}
            : { status: 401, body: { error: 'Password incorrect' } };
    },
} satisfies Actions;