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
      } else{
        acm["countries"].forEach(k =>{
          if(k.country==each.country) k.total+=1;
        })
      }
      return acm;
    }, {countries: []})

    topCountries.countries.sort((a, b) => { return b.total - a.total })
    topCountries.countries = topCountries.countries.slice(0, 5);

    const end = Date.now();

    return res.status(200).send({ countries: topCountries.countries, timeProcessing: `${Math.floor((end - start))} ms` })
  })

  app.get('/team-insights', async (req, res) =>{

    const start = Date.now();
    let seenTeams = {}
    let teams = users.reduce((acm, each) =>{
      if(!seenTeams[each.team.name]){
        seenTeams[each.team.name]=1;
        acm.push({
          team: each.team.name,
          total_members: 1,
          leaders: each.team.leader ? 1 : 0,
          completed_projects: each.team.projects.filter(project => project.completed).length,
          active_percentage: each.active 
        })
      } else{

        acm.forEach(k =>{
          if(k.team === each.team.name){
            k.total_members+=1;
            k.leaders += each.team.leader ? 1 : 0;
            k.completed_projects+= each.team.projects.filter(project => project.completed).length;
            k.active_percentage += each.active ? 1 : 0
          }
        })
      }
      return acm;
    }, [])

    teams.map(k =>{
      k.active_percentage = +(k.active_percentage / k.total_members * 100).toFixed(2);
    })

    const end = Date.now();

    return res.status(200).send({ teams, timeProcessing: `${Math.floor((end - start))} ms` })
    
  })

  app.get('/active-users-per-day', async (req, res) =>{
    const start = Date.now();

    let seenDates = {};

    let logsPerDate = users.reduce((acm, each) =>{
      each.logs.forEach(log =>{
        if(!seenDates[log.date]){
          seenDates[log.date] = 1;
          acm.push({
            date: log.date,
            total: 1
          })
        } else{
          acm.forEach(k =>{
            if(k.date === log.date){
              k.total+=1;
            }
          })
        }
      })

      return acm;
    }, [])

    const end = Date.now();


    return res.status(200).send({ logins: logsPerDate, timeProcessing: `${Math.floor((end - start))} ms` })
  })
}