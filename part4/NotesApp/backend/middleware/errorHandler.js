import { error as logError } from '../utils/logger.js'

export const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, _next) => {
    const status = error.status || error.statusCode || 500
    logError(error.message)

    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'malformed id' })
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    res.status(status).json({ error: error.message })
}

export default errorHandler