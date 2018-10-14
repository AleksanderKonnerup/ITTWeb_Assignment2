const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://test:test@itwebassignment2-shard-00-00-l9jgn.mongodb.net:27017,itwebassignment2-shard-00-01-l9jgn.mongodb.net:27017,itwebassignment2-shard-00-02-l9jgn.mongodb.net:27017/test?ssl=true&replicaSet=ITWEBAssignment2-shard-0&authSource=admin&retryWrites=true";
const assert = require('assert');
const User = require('../models/User.js');

const CreateUser = function(req, res) {
    const user = {username: req.body.username};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        db.db('ITWEB_Assignment_2').collection('User').insertOne(user)
                                                     .then((userResult) => res.status(201).json(userResult))
                                                     .catch((err) => res.status(400).json(err));
    });
};

const Login = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
    db.db("ITWEB_Assignment_2").collection("User").findOne({'username': req.params.username}, function(err, user) {

        if((user != null) && (user.username === req.params.username))
            res.status(200).json({'user': user});
        else
            res.status(401).send();
    })
    });
};  

module.exports = {
    CreateUser,
    Login
};