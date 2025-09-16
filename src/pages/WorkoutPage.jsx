import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkouts,
  resetWorkouts,
  deleteWorkout as deleteWorkoutThunk,
} from "../features/workouts/workoutSlice";
import {
  createWorkout as createWorkoutApi,
  updateWorkout as updateWorkoutApi,
} from "../api/workouts";
import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";
import { Box, Button } from "@mui/material";

function WorkoutPage() {
  const dispatch = useDispatch();
  const { workouts, isLoading, isError, message } = useSelector(
    (state) => state.workouts
  );
  const { user } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user?.token) {
      dispatch(getWorkouts());
    }

    return () => {
      dispatch(resetWorkouts());
    };
  }, [dispatch, user]);

  // Crea un nuovo workout
  const handleAddWorkout = async (workoutData) => {
    try {
      await createWorkoutApi(workoutData, user.token); // Passa il token
      dispatch(getWorkouts());
      setShowForm(false);
    } catch (error) {
      console.error("Errore creazione workout:", error);
    }
  };

  // Aggiorna un workout esistente
  const handleUpdate = async (workoutId, updatedData) => {
    try {
      await updateWorkoutApi(workoutId, updatedData, user.token); // Passa il token
      dispatch(getWorkouts());
    } catch (error) {
      console.error("Errore aggiornamento workout:", error);
    }
  };

  // Elimina un workout
  const handleDelete = async (workoutId) => {
    try {
      await dispatch(deleteWorkoutThunk(workoutId)).unwrap(); // Thunk gestisce token
      dispatch(getWorkouts());
    } catch (error) {
      console.error("Errore cancellazione workout:", error);
    }
  };

  if (isLoading) return <p>Caricamento...</p>;
  if (isError) return <p>Errore: {message}</p>;

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", p: 3 }}>
      <h1>Le tue schede di allenamento</h1>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Chiudi Form" : "Nuovo Workout"}
      </Button>

      {showForm && <WorkoutForm onAdd={handleAddWorkout} />}

      <WorkoutList
        workouts={workouts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </Box>
  );
}

export default WorkoutPage;
