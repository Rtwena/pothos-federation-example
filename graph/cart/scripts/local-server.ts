import express from 'express'
import { handler } from '../src/server'
import { ALBEvent, ALBResult } from 'aws-lambda'

const app = express()
app.use(express.json())

app.use('/', async (req, res) => {
  const { headers, statusCode, body } = (await handler(
    {
      body: JSON.stringify(req.body),
      headers: req.headers,
      httpMethod: req.method,
      path: req.path,
      multiValueHeaders: undefined,
      queryStringParameters: req.query,
    } as ALBEvent,
    {} as never,
    {} as never,
  )) as ALBResult

  // Set the headers and send the response
  Object.entries(headers || {}).forEach(([key, value]) => {
    res.setHeader(key, value)
  })
  res.status(statusCode).send(body)
})

app.use((err, _req, res) => {
  console.error(JSON.stringify(err, null, 2))
  res.status(500).send('Internal server error')
})

const port = process.env.PORT || 4001

app.listen(port, () => {
  console.log(`Listening on port ${port} 🚀`)
})
