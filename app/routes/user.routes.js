module.exports = (app) => { 
    const user = require('../controllers/user.controller.js');

    app.get('/users',user.getUserList);

    app.post('/new_user',user.create);

}