const express = require('express')
const app = express()

app.use(express.json())

let people = [{
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/info', (request, response) => {
    const time = new Date().toString()
    response.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <p>${time}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    response.json(people)
})

app.get(`/api/persons/:id`, (request, response) => {
    const id = request.params.id
    const person = people.find(p => p.id === id)

    if (person) {
        return response.json(person)
    } else {
        return response.status(404).end()
    }
})


app.delete(`/api/persons/:id`, (request, response) => {
    const id = request.params.id
    const person = people.find(p => p.id === id)

    if (person) {
        people = people.filter(p => p.id !== id)
        console.log(`deleted ${person.name} with id ${person.id}`);
        return response.status(204).end()

    } else {
        return response.status(404).json({
            error: 'person not found'
        })
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (people.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'already exists'
        })

    }

    const person = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    }

    people = people.concat(person)
    console.log(`created ${person.name} with ${person.id} and ${person.number}`);

    return response.status(201).json(person)

})

const port = 3001
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})