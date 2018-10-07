const express = require('express');
const router = express.Router();
const exercises = require('./controllers/exerciseController');
const workouts = require('./controllers/workouts');
const users = require('./controllers/users')

router.post('/exercises/:workoutId', exercises.CreateExercise);
router.delete('/exercises/:workoutId', exercises.DeleteExercise);

router.post('/workouts/', workouts.createWorkoutProgram);
router.delete('/workouts/:workoutId', workouts.removeWorkout);
router.get('/workouts/:workoutId', workouts.selectWorkout);

router.post('/users/', users.CreateUser)
router.get('/users/:username', users.Login)

module.exports = router;