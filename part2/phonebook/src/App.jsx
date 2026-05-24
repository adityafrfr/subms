import { useEffect, useState } from 'react'
import ShowName from './components/Names'
import axios from "axios"

const App = () => {

  const [persons, setPersons] = useState([])



  const hook = () =>  {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('fulfilled')
      setPersons(response.data)
      
    })
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)

  }

  const searchFilterUpdate = (event) => {
    setSearchFilter(event.target.value)
  }

  const personToShow = searchFilter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(searchFilter.toLowerCase()))


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => newName === person.name) || persons.some(person => newNumber === person.number)) {
      console.log('err, duplicate name or number');
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search</h3>
      <form >
        <p>search: <input onChange={searchFilterUpdate} /></p>
      </form>

      <h3>Enter data</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
          <p>number: <input onChange={handleNumberChange} value={newNumber} /></p>
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>

      <h2>Numbers</h2>

      {personToShow.map(person => <ShowName personName={person.name} key={person.name} personNumber={person.number} />)}

      <div>debug: {newName} {newNumber}</div>

    </div>
  )
}

export default App