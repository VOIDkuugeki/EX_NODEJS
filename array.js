const users = [
    {
        name: 'John',
        age: 25,
        address: {
            street: '123 Main St',
            city: 'New York'
        }
    },
    {
        name: 'Jane',
        age: 24,
        address: {
            street: '456 Main St',
            city: 'Boston'
        }
    },
    {
        name: 'Susan',
        age: 30,
        address: {
            street: '789 Main St',
            city: 'Chicago'
        }
    },
    {
        name: 'Chris',
        age: 20,
        address: {
            street: '101 Main St',
            city: 'Miami'
        }
    }
]

for (let {name, age, address } of users) {
    let userCard = document.createElement('div');
    userCard.innerHTML = `<h2>${name}</h2>
                          <p>Age: ${age}</p>
                          <p>Address: ${address.street}, ${address.city}</p>`;
    
    console.log(userCard);
    let userContainer = document.getElementById('userList');
    userContainer.appendChild(userCard);
}

