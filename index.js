const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 8082

async function doDelay(ms) {
  if(ms) {
    await new Promise(r => setTimeout(r, ms))
  } 
}

async function handleGet(req, res) {
  console.log(`${req.method} ${req.url}`)
  await doDelay(req.query.delay);
  res.send("OK")  
}

async function handlePost(req, res) {
  let body = JSON.stringify(req.body);
  console.log(`${req.method} ${req.url} ${body}`)
  await doDelay(req.query.delay);
  res.send({ errors: [], total_records: 0 })
}

app.use(bodyParser.json({type: 'application/json'}))

app.post('/_/tenant', (req, res) => handlePost(req, res))
app.get('/admin/health', (req, res) => handleGet(req, res))

app.listen(port, () => console.log(`mod-slow listening on port ${port}!`))
