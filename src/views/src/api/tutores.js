import axios from "axios";
const API_URL = "http://localhost:3001";

// Tutores
export async function getTutores() {
  const { data } = await axios.get(`${API_URL}/tutores`);
  return data;
}

export async function getTutorById(id) {
  const { data } = await axios.get(`${API_URL}/tutores/${id}`);
  return data;
}

export async function createTutor(tutor) {
  const { data } = await axios.post(`${API_URL}/tutores`, tutor);
  return data;
}

export async function updateTutor(id, updates) {
  const { data } = await axios.patch(`${API_URL}/tutores/${id}`, updates);
  return data;
}

export async function deleteTutor(id) {
  const { data } = await axios.delete(`${API_URL}/tutores/${id}`);
  return data;
}

export async function toggleAtivoTutor(id, ativo) {
  const { data } = await axios.patch(`${API_URL}/tutores/${id}`, { ativo });
  return data;
}