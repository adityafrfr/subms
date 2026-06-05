import 'dotenv/config'
import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  console.log('MONGODB_URI missing')
  process.exit(1)
}

if (process.argv.length !== 2 && process.argv.length !== 4) {
  console.log('args empty')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {})

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
