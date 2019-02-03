const {User} = require('../models/user.model');
const { usersLocation, getUsers, saveUsers, getCars, saveCars } = require('../utils');

const Users = getUsers();

const UserController = (req, res) => {
    // let MyModelUsers = Users.map( userData => new User( userData.name, userData.lastname) );
    // Users.forEach((user,index) => {
    //     console.log(user)
    // });
    res.json(Users);
}

const UserControllerStore = (req, res) => {
    let ID = (Users.length) ? Number(Users[Users.length-1].id+1) : 1;
    Users.push(new User(
            ID,
            req.body.data[0],
            req.body.data[1],
            req.body.data[2],
            req.body.data[3],
            req.body.data[4],
            req.body.data[5],
            req.body.data[6],
            req.body.data[7]
    ));
    saveUsers(Users);
}

const UserControllerUpdate = (req,res) => {
    for(let i = 0; i < Users.length; i++) {
        if(Users[i].id == req.params.id) {
            Users[i].firstName = req.body.data[0];
            Users[i].lastName = req.body.data[1];
            Users[i].fatherName = req.body.data[2];
            Users[i].personalNumber = req.body.data[3];
            Users[i].day = req.body.data[4];
            Users[i].month = req.body.data[5];
            Users[i].year = req.body.data[6];
            Users[i].activeStatus = req.body.data[7];
            saveUsers(Users);
            console.log(Users[i])
            break;
        }
    }
}

const UserControllerDelete = (req,res) => {
    for(let i = 0; i < Users.length; i++) {
        if(Users[i].id == req.params.id) {
            Users.splice(i,1);
            saveUsers(Users);
            console.log('Deleted!')
            break
        }
    }
}

module.exports = { UserController, UserControllerStore, UserControllerUpdate, UserControllerDelete }