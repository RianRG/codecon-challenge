import fastify from 'fastify';
import { Routes } from './routes/routes.js';

import {fileURLToPath} from 'url';
import path, { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = fastify();
let users = [];
app.register(Routes)
export { app, users, __dirname };