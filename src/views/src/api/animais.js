import axios from "axios";
const API_URL = "http://localhost:3001";

// Animais
export async function getAnimais() {
  const { data } = await axios.get(`${API_URL}/animais`);
  return data;
}

export async function getAnimalById(id) {
  const { data } = await axios.get(`${API_URL}/animais/${id}`);
  return data;
}

export async function createAnimal(animal) {
  // O backend espera tutorId no corpo ou como parte do animal, conforme o contrato
  const { data } = await axios.post(`${API_URL}/animais`, animal);
  return data;
}

export async function updateAnimal(id, updates) {
  const { data } = await axios.patch(`${API_URL}/animais/${id}`, updates);
  return data;
}

export async function deleteAnimal(id) {
  const { data } = await axios.delete(`${API_URL}/animais/${id}`);
  return data;
}

export async function getAnimaisByTutor(tutorId) {
  const { data } = await axios.get(`${API_URL}/animais/tutor/${tutorId}`);
  return data;
}

export async function toggleAtivoAnimal(id) {
  // PATCH para alternar status, ajuste conforme sua API (pode ser PATCH /animais/:id com { ativo: false/true } )
  const { data } = await axios.patch(`${API_URL}/animais/${id}/toggle-ativo`);
  return data;
}
