// src/api/relatorios.js
import axios from "axios";

const API_URL = "http://localhost:3001/relatorios/tutores";

export async function getRelatorioVacinasPorTutor(tutorId) {
  const { data } = await axios.get(`${API_URL}/${tutorId}/vacinas`);
  return data;
}

export async function getRelatorioConsultasPorTutor(tutorId) {
  const { data } = await axios.get(`${API_URL}/${tutorId}/consultas`);
  return data;
}

export async function getRelatorioVacinasTodosTutores() {
  const { data } = await axios.get(`${API_URL}/vacinas`);
  return data;
}

export async function getRelatorioConsultasTodosTutores() {
  const { data } = await axios.get(`${API_URL}/consultas`);
  return data;
}
