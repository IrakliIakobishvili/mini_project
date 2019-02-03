const General = {
    root: document.getElementById('app-root'),
    renderIcon4: function (className) {
        let icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add(className);
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    },
    renderIcon5: function (className) {
        let iconClass = className;
        iconClass = iconClass.split(' ');
        let icon = document.createElement('i');
        iconClass.forEach(element => {
            icon.classList.add(element);
        });
        return icon;
    },
    createElement: function(element,classes,id,quantity) {
        let $el = undefined;
        let $els = [];
        if(quantity) {
            for(let i = 0; i < quantity; i++) {
                (element) ? $el = document.createElement(element) : false;
                (classes && (typeof classes == 'object')) ? classes.forEach(className => {$el.classList.add(className)}) : true;      
                $els.push($el);
            }
            return $els;
        }else {            
            (element) ? $el = document.createElement(element) : false;
            (classes && (typeof classes == 'object')) ? classes.forEach(className => {$el.classList.add(className)}) : true;      
            (id) ? $el.setAttribute('id',id) : true;
            return $el;
        }
    },
    appendChilds: function(parent,children) {
        children.forEach(child => {parent.appendChild(child)});
        return parent;
    },
    findParentNode(el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    },
    validateEmail: function(str) {
        let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'igm') 
        return regex.test(str);
    },
    ajaxRequest: function(url,method,data) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = function(){
            if(xhr.status == 200) {
                let response = JSON.parse(this.responseText);
                // console.log("SSS")
                // console.log(response)  
                // callBack(response);    
            }                
        }
        xhr.send(JSON.stringify({
            data:data
        }));
    },
    removeElement: function(element) {
        element.querySelectorAll('*').forEach(el => {
            el.inneHTML = '';
            el.parentNode.removeChild(el);
        });
    },
    users: '',
    cars: ''
}