import express from "express";
import tutorRoutes from "./routes/tutorRoutes";
import animalRoutes from "./routes/animalRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import vacinaAplicadaRoutes from "./routes/vacinaRoutes";
import relatorios from "./routes/relatorioRoutes";
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());

// Mapeamento das rotas por grupo funcional
// Por isso:
app.use('/tutores', tutorRoutes);
app.use('/animais', animalRoutes);
app.use('/consultas', consultaRoutes);
app.use('/vacinas-aplicadas', vacinaAplicadaRoutes);
app.use('/relatorios', relatorios);

export default app;
