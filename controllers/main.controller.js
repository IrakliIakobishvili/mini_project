const path = require('path');

const MainController = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', '/index.html'));
}

module.exports = { MainController }