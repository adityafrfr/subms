import { useEffect, useState } from 'react'
import ShowName from './components/Names'
import axios from "axios"
import contactService from './service/contacts'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 1000)
  }



  useEffect(() => {
    contactService.getAll().then(response => {
      setPersons(response)
    })
  }, [])


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
    const existingPerson = persons.find(person => person.name === newName)


    if (existingPerson) {
      if (window.confirm(`${newName} already exists. replace number?`)) {
        contactService.update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(response => {
            setPersons(person => person.map(p => p.id === existingPerson.id ? response : p))
            notify(`Updated ${newName}`)
          })
        setNewName('')
        setNewNumber('')
      }
      return
    }


    contactService.create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        notify(`Created ${newName}`)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notify(`Deleted ${newName}`)
        })
        .catch(error => {
          notify(`${name} Does not exist`, 'error')
        })
    }
  }



return (
  <div>
    <h2>Phonebook</h2>
    <Notification message={notification.message} type={notification.type} />
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

    {personToShow.map(person => <ShowName personName={person.name} key={person.name} personNumber={person.number} onClick={() => { deletePerson(person.id, person.name) }} />)}

    <div>debug: {newName} {newNumber}</div>

  </div>
)
}

export default App