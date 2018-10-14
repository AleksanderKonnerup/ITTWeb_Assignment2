const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://test:test@itwebassignment2-shard-00-00-l9jgn.mongodb.net:27017,itwebassignment2-shard-00-01-l9jgn.mongodb.net:27017,itwebassignment2-shard-00-02-l9jgn.mongodb.net:27017/test?ssl=true&replicaSet=ITWEBAssignment2-shard-0&authSource=admin&retryWrites=true";

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const assert = require('assert');

const CreateExercise = function(req, res) {
    var exercise = {exerciseName: req.body.name,
    description: req.body.description,
    set: req.body.set,
    reps: req.body.reps};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        db.db('ITWEB_Assignment_2').collection('Exercise').insertOne(exercise, function(err, result){
            assert.equal(null,err);
        });

        db.db('ITWEB_Assignment_2').collection('Workout').update({_id: ObjectId(req.url.workoutId)},
        { $push: {"exercises": {
            exerciseName: req.body.name
        }}});
    })

    console.log("Exercise added");
    res.redirect("/");
};

const DeleteExercise = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        db.db("ITWEB_Assignment_2").collection("Exercise").findOneAndDelete({"exercisename" : req.body.name },function(err, result){
            assert.equal(null, err);
        });

        db.db("ITWEB_Assignment_2").collection("Workout").update({_id: ObjectId(req.url.workoutId)},
        { $pull: {"exercises": {
            exerciseName: req.body.name
        }}});
    })

    console.log("Exercise deleted");
    res.redirect("/");
};

const getAllExercises = function(req, res) {
    var resultArray = [];
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
    db.db("test").collection("WorkOutPrograms").find({}, (err, data) => {
        assert.equal(null, err);
        data.forEach(element => {
            resultArray.push(element);
        }).then(() => {
            res.render("mainView", {exercises_Array : resultArray});
        });
    })
})};


module.exports = {
    CreateExercise, 
    DeleteExercise,
    getAllExercises
};