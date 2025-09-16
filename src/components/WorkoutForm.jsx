import React, { useState } from "react";

const emptyExercise = {
  name: "",
  muscle_groups: [],
  sets: 1,
  reps: 1,
  weight: 0,
  rest_time: 0,
  intensity_technique: "Nessuna",
  notes: "",
};

const WorkoutForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([ { ...emptyExercise } ]);

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    if (field === "muscle_groups") {
      updatedExercises[index][field] = value.split(",").map((s) => s.trim());
    } else {
      updatedExercises[index][field] = value;
    }
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { ...emptyExercise }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onAdd({ name, description, exercises });
    setName("");
    setDescription("");
    setExercises([{ ...emptyExercise }]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Crea una nuova scheda</h3>
      <input
        type="text"
        placeholder="Nome scheda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Descrizione"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h4>Esercizi</h4>
      {exercises.map((ex, idx) => (
        <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nome esercizio"
            value={ex.name}
            onChange={(e) => handleExerciseChange(idx, "name", e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Gruppi muscolari (separati da virgola)"
            value={ex.muscle_groups.join(", ")}
            onChange={(e) => handleExerciseChange(idx, "muscle_groups", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Serie"
            value={ex.sets}
            onChange={(e) => handleExerciseChange(idx, "sets", e.target.value)}
            min="1"
          />
          <input
            type="number"
            placeholder="Ripetizioni"
            value={ex.reps}
            onChange={(e) => handleExerciseChange(idx, "reps", e.target.value)}
            min="1"
          />
          <input
            type="number"
            placeholder="Peso (kg)"
            value={ex.weight}
            onChange={(e) => handleExerciseChange(idx, "weight", e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Recupero (s)"
            value={ex.rest_time}
            onChange={(e) => handleExerciseChange(idx, "rest_time", e.target.value)}
            min="0"
          />
          <input
            type="text"
            placeholder="Tecnica (opzionale)"
            value={ex.intensity_technique}
            onChange={(e) => handleExerciseChange(idx, "intensity_technique", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addExercise}>+ Aggiungi esercizio</button>
      <br />
      <button type="submit">Crea Scheda</button>
    </form>
  );
};

export default WorkoutForm;
