// relatorio.routes.ts
import { Router } from 'express';
import { RelatorioController } from '../controllers/RelatorioController';

const router = Router();

router.get('/relatorios/tutores/:tutorId/vacinas', RelatorioController.vacinasPorTutor);
router.get('/relatorios/tutores/:tutorId/consultas', RelatorioController.consultasPorTutor);

export default router;
