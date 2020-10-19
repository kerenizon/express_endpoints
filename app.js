const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let users = [{
    id: 1,
    name: 'Mike'
},
{
    id: 2,
    name: 'Tal'
}];

let products = [{
    id: 1,
    description: 'bread'
},{ 
    id: 2,
    description: 'milk'
}];

app.get('/', (req, res) => {
    res.send('Hello app!');
  })

// Retrieve all users
// http://localhost:3000/users
app.get('/users', (req, res) => {
    res.send(users);
});

// Create a new user
// http://localhost:3000/user
app.post('/user', (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.send('You did not enter name');
    }
    const found = users.some(el => el.name === name);
    if (found) {
        return res.send('You entered existing user')
    }
    const newUser = {
        name,
        id: users.length + 1
    };
   
    users.push(newUser);
    res.send(users);
})

// Delete a user by Id
// http://localhost:3000/user?id=1
app.delete('/user', (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.send('You did not enter id');
    }
    const usersToRemain = users.filter(function (el) {
        return el.id !== id;
    });
    users = usersToRemain;
    res.send(users);
});

// Update a user with Id
// http://localhost:3000/user?id=1
app.put("/user", (req, res) => {
    const id = parseInt(req.query.id);
    if (!id) {
        return res.send('You did not enter id');
    }
    users.forEach((el) => {
        if (el.id === id){
            el.name = req.body.name;
        }
    } );
    res.send(users);
});

// Retrieve all products
// http://localthost:3000/products
app.get('/products', (req, res) => {
    res.send(products);
});

// Create a new product
// http://localhost:3000/product
app.post('/product', (req, res) => {
    const description = req.body.description;
    if (!description) {
        return res.send('You did not enter name');
    }
    const newProduct = {
        description,
        id: products.length + 1
    };
   
    products.push(newProduct);
    res.send(products);
})


app.get('*', (req, res) => {
    res.send('404: page not found');
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

