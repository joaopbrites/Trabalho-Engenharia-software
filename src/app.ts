import express from "express";
import tutorRoutes from "./routes/tutorRoutes";
import animalRoutes from "./routes/animalRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import vacinaAplicadaRoutes from "./routes/vacinaRoutes";
import relatorios from "./routes/relatorioRoutes";
import cors from 'cors';
import DatabaseManager from './config/database';

// Inicializa o banco de dados
DatabaseManager.getInstance();

const app = express();

// Configuração CORS simplificada
app.use(cors({
  origin: true, // Permite qualquer origem em desenvolvimento
  credentials: true
}));

app.use(express.json());

// Mapeamento das rotas por grupo funcional
// Por isso:
app.use('/tutores', tutorRoutes);
app.use('/animais', animalRoutes);
app.use('/consultas', consultaRoutes);
app.use('/vacinas-aplicadas', vacinaAplicadaRoutes);
app.use('/relatorios', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
}, relatorios);

export default app;
