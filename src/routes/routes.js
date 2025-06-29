// import { users } from "../app.js"
import { readFile, readFileSync } from "node:fs"
import { __dirname } from "../app.js";
import path from 'path'
let users = [];
export async function Routes(app){
  app.post('/users', async (req, res) =>{
    let data = await readFileSync(path.join(__dirname, 'assets/usuarios.json'));
    data = data.toString();
    users = JSON.parse(data);
    return res.status(201).send({ msg: 'created Sucessfully!' })
  })
}