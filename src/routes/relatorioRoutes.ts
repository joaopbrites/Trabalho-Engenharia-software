// relatorio.routes.ts
import { Router } from 'express';
import { RelatorioController } from '../controllers/RelatorioController';

const router = Router();

router.get('/tutores/vacinas', RelatorioController.vacinasPorTodosTutores);
router.get('/tutores/consultas', RelatorioController.consultasPorTodosTutores);
router.get('/tutores/:tutorId/vacinas', RelatorioController.vacinasPorTutor);
router.get('/tutores/:tutorId/consultas', RelatorioController.consultasPorTutor);

export default router;
