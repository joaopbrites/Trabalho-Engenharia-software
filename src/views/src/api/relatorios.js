// src/api/relatorios.js
import axios from "axios";

const API_URL = "/api/relatorios";

export async function getRelatorioVacinasPorTutor(tutorId) {
  const { data } = await axios.get(`${API_URL}/vacinas/${tutorId}`);
  return data;
}

export async function getRelatorioConsultasPorTutor(tutorId) {
  const { data } = await axios.get(`${API_URL}/consultas/${tutorId}`);
  return data;
}
