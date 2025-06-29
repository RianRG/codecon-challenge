import { app } from "./app.js";

app.listen({
  port: 5000,
  host: '0.0.0.0'
}).then(() => console.log('runnin at 5000'))
