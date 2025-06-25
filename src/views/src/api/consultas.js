import axios from "axios";
const API_URL = "http://localhost:8080";

// Consultas
export async function getConsultas() {
  const { data } = await axios.get(`${API_URL}/consultas`);
  return data;
}

export async function getConsultaById(id) {
  const { data } = await axios.get(`${API_URL}/consultas/${id}`);
  return data;
}

export async function createConsulta(consulta) {
  // O backend espera animalId no corpo ou como parte do consulta, conforme o contrato
  const { data } = await axios.post(`${API_URL}/consultas`, consulta);
  return data;
}

export async function updateConsulta(id, updates) {
  const { data } = await axios.patch(`${API_URL}/consultas/${id}`, updates);
  return data;
}

export async function deleteConsulta(id) {
  const { data } = await axios.delete(`${API_URL}/consultas/${id}`);
  return data;
}

export async function getConsultasByAnimal(animalId) {
  const { data } = await axios.get(`${API_URL}/consultas/animal/${animalId}`);
  return data;
}
