const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())

app.use(express.static('dist'))

app.use(cors())
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)
app.use(morgan('dev'))

app.get('/info', (request, response, next) => {
    Person.find({}).then(people => {
        const time = new Date().toString()
        response.send(`
            <p>Phonebook has info for ${people.length} people</p>
            <p>${time}</p>
        `)
    }).catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(people => {
        response.json(people)
    }).catch(error => next(error))
})

app.get(`/api/persons/:id`, (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                return response.json(person)
            }

            response.status(404).end()
        })
        .catch(error => next(error))
})


app.delete(`/api/persons/:id`, (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    Person.findOne({ name: body.name })
        .then(existingPerson => {
            if (existingPerson) {
                return response.status(400).json({
                    error: 'already exists'
                })
            }

            return person.save().then(savedPerson => {
                console.log(`created ${savedPerson.name} with ${savedPerson.id} and ${savedPerson.number}`);
                response.status(201).json(savedPerson)
            })
        })
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
