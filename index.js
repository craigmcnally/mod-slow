const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 8082
const defaultDelay = process.env.DELAY

async function doDelay(ms) {
  let delay = ms || defaultDelay || 0
  await new Promise(r => setTimeout(r, delay))
}

async function handleGetAdminHealth(req, res) {
  console.log(`${req.method} ${req.url}`)
  res.send("OK")  
}

async function handlePostTenant(req, res) {
  let body = JSON.stringify(req.body);
  console.log(`${req.method} ${req.url} ${body}`)
  await doDelay(req.query.delay);
  res.send({ errors: [], total_records: 0 })
}

app.use(bodyParser.json({type: 'application/json'}))

app.post('/_/tenant', (req, res) => handlePostTenant(req, res))
app.get('/admin/health', (req, res) => handleGetAdminHealth(req, res))

app.listen(port, () => console.log(`mod-slow listening on port ${port}!`))
