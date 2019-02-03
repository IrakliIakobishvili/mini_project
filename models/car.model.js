class Car {
    constructor(id,mark,model,vin,number,color,owner,status) {
        this.id = id;
        this.mark = mark;
        this.model = model;
        this.vin = vin;
        this.number = number;
        this.color = color;
        this.currentOwner = owner;
        this.activeStatus = status;
        this.owners = [];
        this.registerDate = new Date(Date.now()).toLocaleString();
    }
 }
 
 module.exports = { Car };