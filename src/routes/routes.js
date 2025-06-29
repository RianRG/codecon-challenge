// import { users } from "../app.js"
import { readFile, readFileSync } from "node:fs"
import { __dirname } from "../app.js";
import path from 'path'
let users = [], superUsers=[];

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
    superUsers = users.filter(user =>{
      return user.score>=900 && user.active
    })
    const end = Date.now();
    return res.status(200).send({ timeProcessing: `${Math.floor((end - start))} ms` })
  })

  app.get('/top-countries', async (req, res) =>{
    const start = Date.now();
    
    let seen = {}
    const topCountries = superUsers.reduce((acm, each, idx) =>{
      if(!seen[each.country]){
        seen[each.country] = 1;
        acm["countries"].push({
          country: each.country,
          total: 1
        })
      }
      

      acm["countries"].forEach(k =>{
        if(k.country==each.country) k.total+=1;
      })
      return acm;
    }, {countries: []})

    topCountries.countries.sort((a, b) => { return b.total - a.total })
    topCountries.countries = topCountries.countries.slice(0, 5);

    const end = Date.now();

    return res.status(200).send({ countries: topCountries.countries, timeProcessing: `${Math.floor((end - start))} ms` })
  })
}