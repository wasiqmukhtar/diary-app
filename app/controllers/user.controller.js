const User = require('../models/user.model.js')

//Create new user
exports.create = (req,res)=>{
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username or Password content cannot be empty"
        });
    }

    //Check if the username is already taken
    User.findOne({username:req.body.username})
    .then(user=>{
        if(!user){
            console.log('Username not taken. Creating new user.')
            const user = new User({
                username: req.body.username, 
                password: req.body.password
            });
            user.save()
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
            message: err.message || "Some error occurred while creating the Diary."
        });
    });
        }
        else{
            res.status(410).send({
                message: err.message || "Username has already been taken."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    })
}

//Get a list of all users
exports.getUserList = (req,res)=>{
    User.find().select('username ')
    .then(userlist =>{
        res.send(userlist);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user list."
        });
    })
}

//Get user id for a given username
module.exports.getUserId = function(username){
    return new Promise(function(resolve, reject) {
        // Do async job
        User.findOne({username:username}, function(err,user) {
            if (err) {
                reject(err);
            } else {
                resolve(user.id);
            }
        })
    })
}
