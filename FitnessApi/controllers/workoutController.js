const MongoClient = require('mongodb').MongoClient;
//const url = "mongodb+srv://test:test@itwebassignment2-l9jgn.mongodb.net/admin";
const url = "mongodb://127.0.0.1:27017/ITWEB_Assignment_2";

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const assert = require('assert');
const linq = require('linqjs')

const createWorkoutProgram = function(req, res) {
    var Workout = {workoutName: req.body.workoutName};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);

        db.db('ITTWEBAssignment2').collection('Workout').insertOne(Workout, function(err, result){
            assert.equal(null,err);
            console.log("Workout added");
        });
    });
    
    res.redirect("/");
};

const removeWorkout = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        db.db("ITTWEBAssignment2").collection("Workout").findOneAndDelete({"_id" : ObjectId(req.url.workoutId) },function(err, result){
            assert.equal(null, err);
            console.log("Workout deleted");
        });
    })

    res.redirect("/");
};

const selectWorkout = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        var selectedWorkout = db.db("ITTWEBAssignment2").collection("Workout").find({"_id" : ObjectId(req.url.workoutId) },function(err, result){
            assert.equal(null, err);
        });

        var resultArray = [];
        db.db("ITTWEBAssignment2").collection("Exercise").find({}, (err, data) => {
            assert.equal(null, err);
            data.foreach(element1 => {
                selectedWorkout.exercises.foreach(element2 => {
                    if(element2.exerciseName === element1.exerciseName)
                    {
                        resultArray.push(element1);
                    }
                })
            })
        })
    }).then(() => {
        selectedWorkout.exercises = resultArray;

        return selectedWorkout;
    });
};

const CreateWorkoutActivity = function(req, res) {
    var exercise = {exerciseName: req.body.name,
    description: req.body.description,
    set: req.body.set,
    reps: req.body.reps};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);

        db.db('ITTWEBAssignment2').collection('Workout').update({_id: ObjectId(req.url.workoutId)},
        { $push: {"activities": {
            timestamp: Date.now,
            description: req.body.description
        }}});
    })

    console.log("Activity added");
    res.redirect("/");
};


const GetAllWorkouts = function(req, res) {
    var allWorkouts = [];
    
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);

        db.db("ITTWEBAssignment2").collection("Workout").find({},function(err, result){
            assert.equal(null, err);
            allWorkouts.push(result);
        });
    }).then(() => {
        return allWorkouts;
    });;
}

module.exports = {
    createWorkoutProgram,
    removeWorkout,
    selectWorkout,
    CreateWorkoutActivity,
    GetAllWorkouts
};