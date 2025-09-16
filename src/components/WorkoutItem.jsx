import React, { useState } from "react";
import WorkoutForm from "./WorkoutForm"; 

const WorkoutItem = ({ workout, onUpdate, onDelete }) => {
  const [exercises, setExercises] = useState(workout.exercises || []);
  const [editMode, setEditMode] = useState(false); 

  const handleNoteChange = (index, newNote) => {
    const updatedExercises = exercises.map((ex, idx) => {
      if (idx === index) {
        return { ...ex, notes: newNote }; // creiamo un nuovo oggetto
      }
      return ex;
    });
    setExercises(updatedExercises);
  };
  const handleSaveNotes = () => {
    const updatedWorkout = { ...workout, exercises };
    onUpdate(workout._id, updatedWorkout);
  };

  const handleUpdateClick = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (updatedData) => {
    onUpdate(workout._id, updatedData);
    setEditMode(false);
  };

  const handleFormCancel = () => {
    setEditMode(false);
  };

  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <h3>{workout.name}</h3>
      <p>{workout.description}</p>

      {!editMode ? (
        <>
          <h4>Esercizi</h4>
          {exercises.map((ex, idx) => (
            <div key={idx} style={{ marginBottom: "15px" }}>
              <strong>{ex.name}</strong> – Gruppi muscolari:{" "}
              {ex.muscle_groups.join(", ")}
              <br />
              Serie: {ex.sets} × Ripetizioni: {ex.reps} × Peso: {ex.weight}kg
              <br />
              Recupero: {ex.rest_time}s | Tecnica: {ex.intensity_technique}
              <br />
              <textarea
                value={ex.notes || ""}
                onChange={(e) => handleNoteChange(idx, e.target.value)}
                placeholder="Aggiungi note..."
                rows={2}
                cols={40}
              />
            </div>
          ))}

          <button onClick={handleSaveNotes}>💾 Salva Note</button>
          <button onClick={() => onDelete(workout._id)}>❌ Elimina Scheda</button>
          <button onClick={handleUpdateClick}>✏️ Modifica Scheda</button>
        </>
      ) : (
        <WorkoutForm
          onAdd={handleFormSubmit}
          onCancel={handleFormCancel}
          initialData={workout} // precompila il form con i dati esistenti
        />
      )}
    </div>
  );
};

export default WorkoutItem;


