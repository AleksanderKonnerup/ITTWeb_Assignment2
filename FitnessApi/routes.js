const express = require('express');
const router = express.Router();
const exercises = require('./controllers/exerciseController');
const workouts = require('./controllers/workoutController');
const users = require('./controllers/userController');

router.post('/exercises/CreateExercise/:workoutId', exercises.CreateExercise);
router.delete('/exercises/DeleteExercise/:workoutId', exercises.DeleteExercise);

router.post('/workouts/CreateWorkoutProgram/', workouts.createWorkoutProgram);
router.delete('/workouts/removeWorkout/:workoutId', workouts.removeWorkout);
router.get('/workouts/selectWorkout/', workouts.selectWorkout);
router.get('/workouts/GetAllWorkouts/', workouts.GetAllWorkouts);
router.post('/workouts/CreateWorkoutActivity/:workoutId', workouts.CreateWorkoutActivity);

router.post('/users/CreateUser/', users.CreateUser);
router.post('/users/Login/:username', users.Login);

module.exports = router;