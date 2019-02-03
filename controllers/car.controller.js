const {Car} = require('../models/car.model');
const { usersLocation, getUsers, saveUsers, getCars, saveCars } = require('../utils');

const Cars = getCars();

const CarController = (req, res) => {
    // let MyModelUsers = Users.map( userData => new User( userData.name, userData.lastname) );
    // Users.forEach((user,index) => {
    //     console.log(user)
    // });
    res.json(Cars);
}

const CarControllerStore = (req, res) => {
    let ID = (Cars.length) ? Number(Cars[Cars.length-1].id+1) : 1;
    Cars.push(new Car(
            ID,
            req.body.data[0],
            req.body.data[1],
            req.body.data[2],
            req.body.data[3],
            req.body.data[4],
            req.body.data[5],
            req.body.data[6]
    ));
    saveCars(Cars);
}

const CarControllerUpdate = (req,res) => {
    for(let i = 0; i < Cars.length; i++) {
        if(Cars[i].id == req.params.id) {
            Cars[i].mark = req.body.data[0];
            Cars[i].model = req.body.data[1];
            Cars[i].vin = req.body.data[2];
            Cars[i].number = req.body.data[3];
            Cars[i].color = req.body.data[4];
            Cars[i].currentOwner = req.body.data[5];
            Cars[i].activeStatus = req.body.data[6];
            saveCars(Cars);
            break;
        }
    }
}

const CarControllerDelete = (req,res) => {
    for(let i = 0; i < Cars.length; i++) {
        if(Cars[i].id == req.params.id) {
            Cars.splice(i,1);
            saveCars(Cars);
            console.log('Deleted!')
            break
        }
    }
}

module.exports = { CarController, CarControllerStore, CarControllerUpdate, CarControllerDelete }