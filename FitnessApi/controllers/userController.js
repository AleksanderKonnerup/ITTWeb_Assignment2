const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://test:test@itwebassignment2-l9jgn.mongodb.net";
const url = "mongodb://127.0.0.1:27017/ITWEB_Assignment_2";
const assert = require('assert');
const User = require('../models/User.js');

const CreateUser = function(req, res) {
    const user = {username: req.body.username};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        db.db('ITWEB_Assignment_2').collection('User').insertOne(user)
                                                     .then((userResult) => res.status(201).json({currentUser: userResult}))
                                                     .catch((err) => res.status(400).send(err));
    });
};

const Login = function(req, res) {
    var isLoggedIn = false;
    
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
    db.db("ITWEB_Assignment_2").collection("User").find({username: req.params.username}, function(err, user) {
        assert.equal(null, err);
        isLoggedIn = true;
        user => res.status(200).json({currentUser: user, LoggedIn: isLoggedIn});
    })
    });
};  

module.exports = {
    CreateUser, 
    Login
};