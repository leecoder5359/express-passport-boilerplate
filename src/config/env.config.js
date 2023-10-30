import { config } from 'dotenv';
import * as path from "path";

config({
    path: path.join(path.resolve(),`.env.${process.env.NODE_ENV || 'development'}`)
});

export const {
    PORT,
    MONGO_URI,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_PASSWORD,
    COOKIE_ENCRYPTION_KEY,
    GOOGLE_EMAIL,
    GOOGLE_EMAIL_PASSWORD
} = process.env;