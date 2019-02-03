class User {
   constructor(id,firstName,lastName,personalNumber,fatherName,day,month,year,activeStatus) {
       this.id = id;
       this.firstName = firstName;
       this.lastName = lastName;
       this.personalNumber = personalNumber;
       this.fatherName = fatherName;
       this.birthday = {
            day: day,
            month: month,
            year: year
       }
       this.activeStatus = activeStatus,
       this.registerDate = new Date(Date.now()).toLocaleString();
   }
}

module.exports = { User };