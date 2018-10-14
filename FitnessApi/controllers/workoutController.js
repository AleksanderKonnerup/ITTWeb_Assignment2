const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://test:test@itwebassignment2-shard-00-00-l9jgn.mongodb.net:27017,itwebassignment2-shard-00-01-l9jgn.mongodb.net:27017,itwebassignment2-shard-00-02-l9jgn.mongodb.net:27017/test?ssl=true&replicaSet=ITWEBAssignment2-shard-0&authSource=admin&retryWrites=true";

const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const assert = require('assert');
const linq = require('linqjs')
const WorkoutProgram = require('../models/Workout.js')

const createWorkoutProgram = function(req, res) {
    const exercise = {exerciseName: '',
        description: '',
        set: '',
        reps: ''};

    var array = [];
    array.push(exercise);

    const workoutProgram = {workoutName: req.body.workoutName,
    exercises: array};

    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);

        db.db('ITWEB_Assignment_2').collection('Workout').insertOne(workoutProgram)
            .then((result) => res.status(201).json({'WorkoutProgram': result}))
            .catch((err) => res.status(400).json(err));
    });
};

const removeWorkout = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        db.db("ITWEB_Assignment_2").collection("Workout").findOneAndDelete({"_id" : ObjectId(req.url.workoutId) },function(err, result){
            assert.equal(null, err);
            console.log("Workout deleted");
        });
    })

    res.redirect("/");
};

const selectWorkout = function(req, res) {
    MongoClient.connect(url,{useNewUrlParser:true},function(err, db){
        assert.equal(null, err);
        
        var selectedWorkout = db.db("ITWEB_Assignment_2").collection("Workout").find({"_id" : ObjectId(req.url.workoutId) },function(err, result){
            assert.equal(null, err);
        });

        var resultArray = [];
        db.db("ITWEB_Assignment_2").collection("Exercise").find({}, (err, data) => {
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

        db.db('ITWEB_Assignment_2').collection('Workout').update({_id: ObjectId(req.url.workoutId)},
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

        db.db("ITWEB_Assignment_2").collection("Workout").find({},function(err, result){
            
            result.forEach(element => {
                allWorkouts.push(element);
            });

            console.log(allWorkouts);

            if((result != null))
                res.status(200).send(allWorkouts);
            else
                res.status(404).send();
        });
    });
}

module.exports = {
    createWorkoutProgram,
    removeWorkout,
    selectWorkout,
    CreateWorkoutActivity,
    GetAllWorkouts
};