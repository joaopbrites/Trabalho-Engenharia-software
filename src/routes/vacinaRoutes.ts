import { Router, Request, Response } from "express";
import { VacinaAplicadaController } from "../controllers/VacinaAplicadaController";
import { AnimalController } from "../controllers/AnimalController";
import { ConsultaController } from "../controllers/ConsultaController";


const router = Router();
const vacinaAplicadaController = new VacinaAplicadaController();
const consultaController = new ConsultaController();
const animalController = new AnimalController();
// RF18: Cadastro de Vacina Aplicada
router.post("/", (req: Request, res: Response) => {
  const animalExists = (id: string) => !!animalController.read(id);
  const consultaExists = (id: string) => !!consultaController.read(id);
  const result = vacinaAplicadaController.create(req.body, animalExists, consultaExists);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF19: Consulta de Vacina Aplicada
router.get("/:id", (req: Request, res: Response) => {
  const result = vacinaAplicadaController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF20: Listagem de Vacinas Aplicadas
router.get("/", (_req: Request, res: Response) => {
  const result = vacinaAplicadaController.list();
  res.json(result);
});

// RF21: Atualização de Vacina Aplicada
router.patch("/:id", (req: Request, res: Response) => {
  const result = vacinaAplicadaController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF22: Remoção de Vacina Aplicada
router.delete("/:id", (req: Request, res: Response) => {
  const result = vacinaAplicadaController.delete(req.params.id);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

// RF23: Listar Vacinas Aplicadas por Animal
router.get("/animal/:animalId", (req: Request, res: Response) => {
  const result = vacinaAplicadaController.listByAnimal(req.params.animalId);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

export default router;
