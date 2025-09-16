import React from "react";
import WorkoutItem from "./WorkoutItem";

const WorkoutList = ({ workouts, onUpdate, onDelete }) => {
  return (
    <div>
      {workouts.length === 0 ? (
        <p>Nessuna scheda disponibile.</p>
      ) : (
        workouts.map((workout) => (
          <WorkoutItem
            key={workout._id}
            workout={workout}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default WorkoutList;
