import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

// Recupera tutte le schede
export const fetchWorkouts = async (token) => {
  if (!token) throw new Error("Token mancante!");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Recupera scheda per ID
export const fetchWorkoutById = async (id, token) => {
  if (!token) throw new Error("Token mancante!");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

// Crea scheda
export const createWorkout = async (workoutData, token) => {
  if (!token) throw new Error("Token mancante!");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, workoutData, config);
  return response.data;
};

// Aggiorna scheda
export const updateWorkout = async (id, workoutData, token) => {
  if (!token) throw new Error("Token mancante!");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${API_URL}/${id}`, workoutData, config);
  return response.data;
};

// Elimina scheda
export const deleteWorkout = async (id, token) => {
  if (!token) throw new Error("Token mancante!");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
