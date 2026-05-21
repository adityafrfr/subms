var animals = [
  { name: 'Fluffykins', species: 'rabbit' },
  { name: 'Caro',       species: 'dog'    },
  { name: 'Hamilton',   species: 'dog'    },
  { name: 'Harold',     species: 'fish'   },
  { name: 'Ursula',     species: 'cat'    },
  { name: 'Jimmy',      species: 'fish'   }
]


const dogs = animals.filter((animal) => {
    if (animal.species === 'dog')   {
        console.log(animal.name);
        
    }
})


