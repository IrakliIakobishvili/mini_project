const Main = {
    mainBox: '',
    mainContent: '',
    contentTopLeftside: '',
    contentTopRightside: '',
    contentBottom: '',
    usersList: '',
    renderMainBox: function() {
        let mainBox = General.createElement('div',['main-box']);
        Main.mainBox = mainBox;
        General.appendChilds(General.root,[mainBox]);
    },
    renderNav: function() {
        let nav       = General.createElement('nav',['nav']);
        let personBtn = General.createElement('button',['nav__btn','nav__btn--person'],'personBtn');
        let carBtn    = General.createElement('button',['nav__btn','nav__btn--car'],'carBtn');
        let infoBtn   = General.createElement('button',['nav__btn','nav__btn--info'],'infoBtn');
        personBtn.classList.add('active');
        General.appendChilds(personBtn,[document.createTextNode('register person')]);
        General.appendChilds(carBtn,[document.createTextNode('register car')]);
        General.appendChilds(infoBtn,[document.createTextNode('information')]);
        General.appendChilds(nav,[personBtn,carBtn,infoBtn]);
        General.appendChilds(Main.mainBox,[nav]);
    },
    renderMain: function() {
        let main = General.createElement('main',['content']);
        Main.mainContent = main;
        General.appendChilds(Main.mainBox,[main]);
    },
    renderContentTop: function() {
        let searchBox = General.createElement('div',['content__search-box']);
        let leftSide  = General.createElement('div',['content__search-box__search']);
        let rightSide = General.createElement('div',['content__search-box__btns','action-btns']);
        let list = General.createElement('ul',['users-list']);
        Main.usersList = list;
        General.appendChilds(leftSide,[list]);
        Main.contentTopLeftside = leftSide;
        Main.contentTopRightside = rightSide;
        General.appendChilds(searchBox,[leftSide,rightSide]);        
        General.appendChilds(Main.mainContent,[searchBox]);
    },
    renderSearchedUsersItems: function(array) {
        let editUserFn = function() {
            let userID = this.getAttribute('data-user-id');
            let targetUser = '';
            General.removeElement(Main.usersList);
            for(let i = 0; i < General.users.length; i++) {
                if(General.users[i].id == userID) {
                    targetUser = General.users[i];
                    break
                }
            }
            Main.renderPersonRegister(
                targetUser.firstName,
                targetUser.lastName,
                targetUser.fatherName,
                targetUser.personalNumber,
                targetUser.birthday.day,
                targetUser.birthday.month,
                targetUser.birthday.year,
                targetUser.activeStatus,
                'PUT',
                id = userID
            );
        }
        General.removeElement(Main.usersList);
        let items = General.createElement('li',['users-list__item'],'',array.length);
        items.forEach((item,index) => {
            item.innerHTML = array[index].firstName+' '+array[index].lastName;
            item.setAttribute('data-user-id',array[index].id);
            item.addEventListener('click',editUserFn);
            General.appendChilds(Main.usersList,[item]);
        });
    },
    renderSearchedCarsItems: function(array) {
        let editCarFn = function() {
            let carID = this.getAttribute('data-car-id');
            let targetCar = '';
            General.removeElement(Main.usersList);
            for(let i = 0; i < General.cars.length; i++) {
                if(General.cars[i].id == carID) {
                    targetCar = General.cars[i];
                    break
                }
            }
            Main.renderCarRegister(
                targetCar.mark,
                targetCar.model,
                targetCar.vin,
                targetCar.number,
                targetCar.color,
                targetCar.currentOwner,
                targetCar.activeStatus,
                targetCar.id,
                'PUT'
            );
        }
        General.removeElement(Main.usersList);
        let items = General.createElement('li',['users-list__item'],'',array.length);
        items.forEach((item,index) => {
            item.innerHTML = array[index].model+' '+array[index].number;
            item.setAttribute('data-car-id',array[index].id);
            item.addEventListener('click',editCarFn);
            General.appendChilds(Main.usersList,[item]);
        });
    },
    renderContentBottom: function() {
        let contentBottom  = General.createElement('div',['content__register-box']);
        Main.contentBottom = contentBottom;
        General.appendChilds(Main.mainContent,[contentBottom]);
    },
    renderSearch: function() {
        let search    = General.createElement('input',['content__search-box__search__input','input']);
        let searchBtn = General.createElement('button',['content__search-box__search__btn']);
        search.setAttribute('placeholder','Search');
        search.setAttribute('id','search');
        General.appendChilds(searchBtn,[General.renderIcon5('fas fa-search')]);        
        General.appendChilds(Main.contentTopLeftside,[search,searchBtn]);

        let searchUsers = function() {
        let $value = this.value.replace(/ +(?=)/g,'').toLowerCase();
        if($value !== '') {         
             //== Ajax Start ==//
             var xhr = new XMLHttpRequest();
             xhr.open('GET', 'users', true);
             xhr.setRequestHeader('Content-type', 'application/json');
             xhr.onload = function(){
                if(xhr.status == 200) {                
                    let Users = JSON.parse(this.responseText);
                    let matchedUsers = [];
                    Users.forEach(user => {
                        if(user.firstName.startsWith(''+$value+'') || user.lastName.startsWith(''+$value+'')) {
                            matchedUsers.push(user);
                            General.users = matchedUsers;
                        }
                    });
                    if(matchedUsers.length) {
                        console.log(matchedUsers)
                        General.removeElement(Main.contentBottom)
                        Main.renderSearchedUsersItems(matchedUsers);
                    }else {
                        console.log("Empty")
                    }
                }            
           }
           xhr.send();
           //== Ajax End ==//
        }else {
            General.removeElement(Main.usersList);
            General.removeElement(Main.contentBottom);
            General.removeElement(Main.contentTopRightside);
            Main.renderAddNewUserBtn();
        }
        
        }
        search.addEventListener('keyup',searchUsers);
    },
    renderSearch2: function() {
        let search2    = General.createElement('input',['content__search-box__search__input','input']);
        let searchBtn = General.createElement('button',['content__search-box__search__btn']);
        search2.setAttribute('placeholder','Search');
        search2.setAttribute('id','search2');
        General.appendChilds(searchBtn,[General.renderIcon5('fas fa-search')]);        
        General.appendChilds(Main.contentTopLeftside,[search2,searchBtn]);
        let searchCars = function() {
            console.log(this.value)
            let $value = this.value.replace(/ +(?=)/g,'').toLowerCase();
            if($value !== '') {     
                //== Ajax Start ==//
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'cars', true);
                xhr.setRequestHeader('Content-type', 'application/json');
                xhr.onload = function(){
                    if(xhr.status == 200) {                
                        let Cars = JSON.parse(this.responseText);
                        console.log(Cars)
                        let matchedCars = [];
                        Cars.forEach(car => {
                            if(car.mark.startsWith(''+$value+'') || car.number.startsWith(''+$value+'')) {
                                matchedCars.push(car);
                                General.cars = matchedCars;
                            }
                        });
                        if(matchedCars.length) {
                            console.log(matchedCars)
                            General.removeElement(Main.contentBottom)
                            Main.renderSearchedCarsItems(matchedCars);
                        }else {
                            console.log("Empty")
                        }
                    }            
            }
            xhr.send();
            //== Ajax End ==//
            }else {
                General.removeElement(Main.usersList);
                General.removeElement(Main.contentBottom);
                General.removeElement(Main.contentTopRightside);
                Main.renderAddNewCarBtn();
            }        
        }
        search2.addEventListener('keyup',searchCars);
    },
    renderActionBtns: function(_id) {
        let updateBtn = General.createElement('button',['action-btns__btn','action-btns__btn--update']);
        let editBtn   = General.createElement('button',['action-btns__btn','action-btns__btn--edit']);
        let delBtn    = General.createElement('button',['action-btns__btn','action-btns__btn--del']);
        General.appendChilds(updateBtn,[document.createTextNode('update')]);
        General.appendChilds(editBtn,[document.createTextNode('edit')]);
        General.appendChilds(delBtn,[document.createTextNode('del')]);
        delBtn.setAttribute('data-user-id',_id);
        General.appendChilds(Main.contentTopRightside,[delBtn]);
        let deleteUserFn = function() {
            let ID = this.getAttribute('data-user-id');
            General.ajaxRequest('users/api/'+ID,'DELETE');
            General.removeElement(Main.contentTopRightside);
            General.removeElement(Main.contentBottom);
            document.querySelector('#search').value = '';
            Main.renderAddNewUserBtn();
        }
        delBtn.addEventListener('click',deleteUserFn);
    }, 
    renderActionBtns2: function(_id) {
        let updateBtn = General.createElement('button',['action-btns__btn','action-btns__btn--update']);
        let editBtn   = General.createElement('button',['action-btns__btn','action-btns__btn--edit']);
        let delBtn    = General.createElement('button',['action-btns__btn','action-btns__btn--del']);
        General.appendChilds(updateBtn,[document.createTextNode('update')]);
        General.appendChilds(editBtn,[document.createTextNode('edit')]);
        General.appendChilds(delBtn,[document.createTextNode('del')]);
        delBtn.setAttribute('data-car-id',_id);
        General.appendChilds(Main.contentTopRightside,[delBtn]);
        let deleteCarFn = function() {
            let ID = this.getAttribute('data-car-id');
            General.ajaxRequest('cars/api/'+ID,'DELETE');
            General.removeElement(Main.contentTopRightside);
            General.removeElement(Main.contentBottom);
            document.querySelector('#search2').value = '';
            Main.renderAddNewCarBtn();
        }
        delBtn.addEventListener('click',deleteCarFn);
    },
    renderPersonRegister: function(_firstName='',_lastName='',_fatherName='',_personalNumber='',_day='day',_month='month',_year='year',_status=true,_method='POST',_id) {
        let form   = General.createElement('form',['person-form']);
        let list   = General.createElement('ul',['person-form__list']);
        let items  = General.createElement('li',['person-form__list__item'],'',8);
        items.forEach((item,index) => {General.appendChilds(list,[item])});
        let inputs = General.createElement('input',['person-form__input','input'],'',4);
        let inputIds = ['firstName','lastName','fatherName','personalNumber'];
        let placeholders = ['First Name','Last Name','Father Name','Personale Number'];
        inputs.forEach((input,index) => {
            input.setAttribute('type','text');
            input.setAttribute('id',inputIds[index]);
            input.setAttribute('placeholder',placeholders[index]);
            General.appendChilds(items[index],[input]);
        });
        let appendOptions = (parent,count,defaultValue,arr) => {
            if(count == 'year') {
                let currentYear = new Date().getFullYear();
                count = currentYear - 1919;
                let options = General.createElement('option',[],'',count);
                let defaultOption = General.createElement('option');
                defaultOption.innerHTML = defaultValue;
                defaultOption.value = 'year';
                General.appendChilds(parent,[defaultOption]);
                    options.map((option,index) => { 
                        option.innerHTML = currentYear;
                        option.setAttribute('value',currentYear--);                        
                        General.appendChilds(parent,[option]);
                }); 
            }else if(count == 12) {
                let options = General.createElement('option',[],'',count);
                let defaultOption = General.createElement('option');
                defaultOption.innerHTML = defaultValue;
                defaultOption.value = 'month';
                General.appendChilds(parent,[defaultOption]);
                    options.map((option,index) => {                    
                        (arr) ? option.setAttribute('value',arr[index]) : option.setAttribute('value',index+1);  
                        (arr) ? option.innerHTML = arr[index] : option.innerHTML = index+1;              
                        General.appendChilds(parent,[option]);
                }); 
            }else if(count == 31) {
                let options = General.createElement('option',[],'',count);
                let defaultOption = General.createElement('option');
                defaultOption.innerHTML = defaultValue;
                defaultOption.value = 'day';
                General.appendChilds(parent,[defaultOption]);
                    options.map((option,index) => {                    
                        (arr) ? option.setAttribute('value',arr[index]) : option.setAttribute('value',index+1);  
                        (arr) ? option.innerHTML = arr[index] : option.innerHTML = index+1;              
                        General.appendChilds(parent,[option]);
                }); 
            }      
            General.appendChilds(items[4],[parent]);   
        }
        let selects = General.createElement('select',['person-form__input','select'],'',3);
        selects.forEach((select,index) => {
            if(index == 0) {
                appendOptions(select,31,'Day');         
            }else if(index == 1) {  
                appendOptions(select,12,'Month',['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']);
            }else if(index == 2) {
                appendOptions(select,'year','Year'); 
            }
        });

        let checkbox = General.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('id','personStatus');
        checkbox.setAttribute('checked',true);
        General.appendChilds(items[5],[checkbox]);
        let registerBtn = General.createElement('button',['register-person-btn'],'registerPerson');
        registerBtn.setAttribute('method','POST');
        General.appendChilds(registerBtn,[document.createTextNode('register')]);
        General.appendChilds(items[6],[registerBtn])
        General.appendChilds(form,[list]);
        General.appendChilds(Main.contentBottom,[form]);
        function isNumber(e) {
            if (
                e.key.length === 1 && e.key !== '.' && isNaN(e.key) && !e.ctrlKey || 
                e.key === '.' && e.target.value.toString().indexOf('.') > -1
              ) {
                e.preventDefault();
              }
        }
        document.querySelector('#personalNumber').addEventListener('keypress',isNumber);
        let registerPersonFn = function(e) {
            e.preventDefault();
            let empty = 0;
            inputs.forEach(input => {
                (input.value.trim() == '') ? (empty++,input.classList.add('warning')) : input.classList.remove('warning');
            });
            selects.forEach((select,index) => {
                if(select.value == 'day' || select.value == 'month' || select.value == 'year') {
                    select.classList.add('warning');
                    empty++;
                }else {
                    select.classList.remove('warning');
                }
            });
            let status = (personStatus.checked) ? true : false;
            let data = [
                inputs[0].value,
                inputs[1].value,
                inputs[2].value,
                inputs[3].value,
                selects[0].value,
                selects[1].value,
                selects[2].value,
                status
            ];
            if(empty == 0) {
                let method = document.querySelector('#registerPerson').getAttribute('method');
                let ID = document.querySelector('#registerPerson').getAttribute('data-user-id');
                if(method == 'POST') {
                    General.ajaxRequest('users','POST',data);
                }else if(method == 'PUT') {
                    General.ajaxRequest('users/api/'+ID,'PUT',data);
                }
                inputs.forEach(input => {
                    input.value = '';
                });
                selects.forEach((select,index) => {
                    if(index == 0) {select.value = 'day'}
                    if(index == 1) {select.value = 'month'}
                    if(index == 2) {select.value = 'year'}
                });
            }
        }
        inputs[0].value = _firstName;
        inputs[1].value = _lastName;
        inputs[2].value = _fatherName;
        inputs[3].value = _personalNumber;
        selects[0].value = _day;
        selects[1].value = _month;
        selects[2].value = _year;
        personStatus.checked = _status;
        let method = _method;
        registerBtn.setAttribute('method',method)
        if(method == 'PUT') {
            registerBtn.innerHTML = 'update';
            Main.renderActionBtns(_id);
        }else {
            registerBtn.innerHTML = 'register';
        }
        registerBtn.setAttribute('data-user-id',_id);
        
        registerBtn.addEventListener('click',registerPersonFn);
    }, 
    renderAddNewUserBtn: function() {
        let addBtn = General.createElement('button',['content__register-box__add-user-btn'],'showRegisterPersonBtn');
        General.appendChilds(addBtn,[General.renderIcon5('fas fa-plus')])
        General.appendChilds(Main.contentBottom,[addBtn]);
        let showRegisterForm = function() {
            General.removeElement(Main.mainContent);
            Main.renderContentTop();
            Main.renderSearch();
            Main.renderContentBottom();
            Main.renderPersonRegister();
        }
        addBtn.addEventListener('click',showRegisterForm);
    },
    renderAddNewCarBtn: function() {
        let addBtn = General.createElement('button',['content__register-box__add-user-btn'],'showRegisterPersonBtn');
        General.appendChilds(addBtn,[General.renderIcon5('fas fa-plus')])
        General.appendChilds(Main.contentBottom,[addBtn]);
        let showRegisterForm = function() {
            General.removeElement(Main.mainContent);
            Main.renderContentTop();
            Main.renderSearch2();
            Main.renderContentBottom();
            Main.renderCarRegister();
        }
        addBtn.addEventListener('click',showRegisterForm);
    },
    renderCarRegister: function(_mark='',_model='',_vin='',_number='',_color='',_owner='',_status,_id,_method='POST') {
        let form   = General.createElement('form',['person-form','car-form']);
        let list   = General.createElement('ul',['person-form__list']);
        let items  = General.createElement('li',['person-form__list__item'],'',8);
        items.forEach((item,index) => {General.appendChilds(list,[item])});
        let inputs = General.createElement('input',['person-form__input','input'],'',6);
        let inputIds = ['mark','model','vin','number','color','owner'];
        let placeholders = ['Mark','Model','VIN','Number','Color','Owner'];
        inputs.forEach((input,index) => {
            input.setAttribute('type','text');
            input.setAttribute('id',inputIds[index]);
            input.setAttribute('placeholder',placeholders[index]);
            General.appendChilds(items[index],[input]);
        });
        let checkbox = General.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('id','carStatus');
        checkbox.setAttribute('checked',true);
        General.appendChilds(items[6],[checkbox]);
        let registerBtn = General.createElement('button',['register-person-btn'],'registerCar');
        registerBtn.setAttribute('method','POST');
        General.appendChilds(registerBtn,[document.createTextNode('register')]);
        General.appendChilds(items[7],[registerBtn])
        General.appendChilds(form,[list]);
        General.appendChilds(Main.contentBottom,[form]);
        function isNumber(e) {
            if (
                e.key.length === 1 && e.key !== '.' && isNaN(e.key) && !e.ctrlKey || 
                e.key === '.' && e.target.value.toString().indexOf('.') > -1
              ) {
                e.preventDefault();
              }
        }
        document.querySelector('#vin').addEventListener('keypress',isNumber);
        let correctPersonalNumber = false;
        let registerCarFn = function(e) {
            e.preventDefault();
            let empty = 0;
            inputs.forEach(input => {
                (input.value.trim() == '') ? (empty++,input.classList.add('warning')) : input.classList.remove('warning');
            });
            let status = (document.querySelector('#carStatus').checked) ? true : false;
            let data = [
                inputs[0].value,
                inputs[1].value,
                inputs[2].value,
                inputs[3].value,
                inputs[4].value,
                inputs[5].value,
                status
            ];
            if(empty == 0) {
                if(correctPersonalNumber) {
                    inputs[5].classList.remove('red');
                    let method = document.querySelector('#registerCar').getAttribute('method');
                    if(method == 'POST') {
                        General.ajaxRequest('cars','POST',data);
                    }else if(method == 'PUT') {
                        let ID = document.querySelector('#registerCar').getAttribute('data-car-id');
                        General.ajaxRequest('cars/api/'+ID,'PUT',data);                  
                    }
                }else {
                    inputs[5].classList.add('red');
                }  
                inputs.forEach(input => {
                    input.value = '';
                });           
            }
        }
        inputs[0].value = _mark;
        inputs[1].value = _model;
        inputs[2].value = _vin;
        inputs[3].value = _number;
        inputs[4].value = _color;
        inputs[5].value = _owner;
        let method = _method;
        registerBtn.setAttribute('method',method);
        if(method == 'PUT') {
            registerBtn.innerHTML = 'update';
            Main.renderActionBtns2(_id);
        }else {
            registerBtn.innerHTML = 'register';
        }
        registerBtn.setAttribute('data-car-id',_id);        
        registerBtn.addEventListener('click',registerCarFn);
        let loadUsersFn = function() {
            let $value = this.value.replace(/ +(?=)/g,'').toLowerCase();
            let $this = this;
            if($value !== '') {         
                 //== Ajax Start ==//
                 var xhr = new XMLHttpRequest();
                 xhr.open('GET', 'users', true);
                 xhr.setRequestHeader('Content-type', 'application/json');
                 xhr.onload = function(){
                    if(xhr.status == 200) {                
                        let Users = JSON.parse(this.responseText);
                        Users.forEach(user => {
                            if(user.personalNumber == $value) {
                                correctPersonalNumber = true; 
                                $this.classList.remove('red');                                
                            }else {
                                $this.classList.add('red');
                            }
                        });
                    }            
               }
               xhr.send();
               //== Ajax End ==//
            }else {
                General.removeElement(Main.usersList);
            }
        }
        inputs[5].addEventListener('keyup',loadUsersFn);
    }, 
    event: function() {
        let changeContent = function() {
            document.querySelectorAll('.nav__btn').forEach(btn => { 
                btn.classList.remove('active');
            });
            this.classList.add('active');
            General.removeElement(Main.mainContent);
            Main.renderContentTop();
            Main.renderContentBottom();
            let ID = this.getAttribute('id');
            switch(ID) {
                case 'personBtn': 
                    Main.renderSearch();                  
                    Main.renderAddNewUserBtn();
                break;
                case 'carBtn':
                    Main.renderSearch2();                
                    Main.renderAddNewCarBtn();
                break;
                case 'infoBtn':
                    console.log("infoBtn")
                break;
            }
        }
        let topBtns = document.querySelectorAll('.nav__btn');
        topBtns.forEach(btn => {            
            btn.addEventListener('click',changeContent);
        });
    },
    render: function() {
        Main.renderMainBox();
        Main.renderNav();
        Main.renderMain();
        Main.renderContentTop();
        Main.renderSearch();
        Main.renderContentBottom();
        Main.renderAddNewUserBtn();
        Main.event();
    }
}
