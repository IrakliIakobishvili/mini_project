const Users = {
    loadUsersInConsol: function() {
        fetch(`${location.href}users`)
        .then( response => {
            return response.json();
        })
        .then( users => {
            console.log(users)
        })
        .catch( error => {
            console.error(error)
        });
    }
}