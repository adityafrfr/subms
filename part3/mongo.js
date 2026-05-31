const mongoose = require('mongoose')

if (process.argv.length < 3)    {
    console.log('give password');
    process.exit(1)
    
}

const password = process.argv[2]

const url = `mongodb+srv://user:${password}@cluster0.oww6s2c.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {})

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = new mongoose.model('Person', personSchema)

if (process.argv.length == 3)   {
    Person.find({}).then(result =>    {
        result.forEach(person => {console.log(`${person.name} ${person.number}`)})
    }).then(() => {mongoose.connection.close()})
}