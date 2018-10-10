const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://test:test@ittwebassignment1-9rxs5.mongodb.net/ITTWEBAssignment2?retryWrites=true";
const assert = require('assert');

const CreateUser = function(req, res) {
    var User = {username: req.body.username};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        db.db('ITTWEBAssignment2').collection('User').insertOne(User, function(err, result){
            assert.equal(null,err);
            console.log("User added");
        });
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');    

    res.status(200).json({currentUser: User});
    // res.redirect("/");
};

const Login = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
    db.db("ITTWEBAssignment2").collection("User").find({"username": req.url.username}, (err, data) => {
        assert.equal(null, err);

        return data;
        })
    });
};


module.exports = {
    CreateUser, 
    Login
};