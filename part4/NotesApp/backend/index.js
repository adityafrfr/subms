import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import noteRouter from './routes/note.routes.js'
import errorHandler, { unknownEndpoint } from './middleware/errorHandler.js'
import { info } from './utils/logger.js'
import './config/env.js'

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.use('/api/notes', noteRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})
