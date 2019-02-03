const express = require('express');

const { MainController } = require('./controllers/main.controller');
const { UserController, UserControllerStore, UserControllerUpdate, UserControllerDelete } = require('./controllers/user.controller');
const { CarController, CarControllerStore, CarControllerUpdate, CarControllerDelete } = require('./controllers/car.controller');
const app = express();

app.use(express.static('public'));
app.use( express.urlencoded( { extended : true } ) );
app.use( express.json() );

app.get('/', MainController);

app.get('/users', UserController);
app.post('/users', UserControllerStore);
app.put('/users/api/:id', UserControllerUpdate);
app.delete('/users/api/:id', UserControllerDelete);

app.get('/cars', CarController);
app.post('/cars', CarControllerStore);
app.put('/cars/api/:id', CarControllerUpdate);
app.delete('/cars/api/:id', CarControllerDelete);

const port = 8000;
app.listen(port, () => {
    console.log(`REST API - http://localhost:${port}/`);
});



