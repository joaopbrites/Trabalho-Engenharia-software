import axios from "axios";
const API_URL = "http://localhost:8080";

// Vacinas Aplicadas
export async function getVacinas() {
  const { data } = await axios.get(`${API_URL}/vacinas-aplicadas`);
  return data;
}

export async function getVacinaById(id) {
  const { data } = await axios.get(`${API_URL}/vacinas-aplicadas/${id}`);
  return data;
}

export async function createVacina(vacina) {
  // O backend espera animalId e consultaId no corpo, conforme o contrato
  const { data } = await axios.post(`${API_URL}/vacinas-aplicadas`, vacina);
  return data;
}

export async function updateVacina(id, updates) {
  const { data } = await axios.patch(`${API_URL}/vacinas-aplicadas/${id}`, updates);
  return data;
}

export async function deleteVacina(id) {
  const { data } = await axios.delete(`${API_URL}/vacinas-aplicadas/${id}`);
  return data;
}

export async function getVacinasByAnimal(animalId) {
  const { data } = await axios.get(`${API_URL}/vacinas-aplicadas/animal/${animalId}`);
  return data;
}
