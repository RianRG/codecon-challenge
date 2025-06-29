// import { users } from "../app.js"
import { readFile, readFileSync } from "node:fs"
import { __dirname } from "../app.js";
import path from 'path'
let users = [];
export async function Routes(app){
  app.post('/users', async (req, res) =>{
    const start = Date.now();
    let data = await readFileSync(path.join(__dirname, 'assets/usuarios.json'));
    data = data.toString();
    users = JSON.parse(data);
    const end = Date.now();
    return res.status(201).send({ msg: 'created Sucessfully!', timeProcessing: `${Math.floor((end - start))} ms`})
  })


  app.get('/superusers', async (req, res) =>{
    const start = Date.now();
    const filteredUsers = users.filter(user =>{
      return user.score>=900 && user.active
    })
    const end = Date.now();
    return res.status(200).send({ superUsers: filteredUsers, timeProcessing: `${Math.floor((end - start))} ms` })
  })
}