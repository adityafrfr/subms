import { useState } from 'react'
import ShowName from './components/Names'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addName = (event) =>  {
    event.preventDefault()

    const newPerson = {
      name: newName
    }

    setPersons(current => current.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) =>  {
    console.log(event.target.value);
    
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <ShowName personName={person.name} key={person.name}/>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App