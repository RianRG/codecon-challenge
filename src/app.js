import fastify from 'fastify';
import { CreateUsersRoute } from './routes/createUsersRoute.js';

import {fileURLToPath} from 'url';
import path, { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = fastify();
const users = [];
app.register(CreateUsersRoute)
export { app, users, __dirname };