import { Schema } from "mongoose";

export const userSchema = new Schema({
    username: String,
    password: String,
    salt: String,
    admin: Boolean,
});