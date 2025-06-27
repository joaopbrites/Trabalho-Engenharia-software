import { Router, Request, Response } from "express";
import { VacinaAplicadaController } from "../controllers/VacinaAplicadaController";
import { AnimalController } from "../controllers/AnimalController";
import { ConsultaController } from "../controllers/ConsultaController";


const router = Router();
const vacinaAplicadaController = new VacinaAplicadaController();
const consultaController = new ConsultaController();
const animalController = new AnimalController();
// RF18: Cadastro de Vacina Aplicada
router.post("/", async (req: Request, res: Response) => {
  const animalExists = async (id: string) => {
    const animal = await animalController.read(id);
    return !("error" in animal);
  };
  const consultaExists = async (id: string) => {
    const consulta = await consultaController.read(id);
    return !("error" in consulta);
  };
  const result = await vacinaAplicadaController.create(req.body, animalExists, consultaExists);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF19: Consulta de Vacina Aplicada
router.get("/:id", async (req: Request, res: Response) => {
  const result = await vacinaAplicadaController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF20: Listagem de Vacinas Aplicadas
router.get("/", async (_req: Request, res: Response) => {
  const result = await vacinaAplicadaController.list();
  res.json(result);
});

// RF21: Atualização de Vacina Aplicada
router.patch("/:id", async (req: Request, res: Response) => {
  const result = await vacinaAplicadaController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF22: Remoção de Vacina Aplicada
router.delete("/:id", async (req: Request, res: Response) => {
  const result = await vacinaAplicadaController.delete(req.params.id);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

// RF23: Listar Vacinas Aplicadas por Animal
router.get("/animal/:animalId", async (req: Request, res: Response) => {
  const result = await vacinaAplicadaController.listByAnimal(req.params.animalId);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

export default router;
