import { Router, Request, Response } from "express";
import { ConsultaController } from "../controllers/ConsultaController";
import { AnimalController } from "../controllers/AnimalController";

const router = Router();
const consultaController = new ConsultaController();
const animalController = new AnimalController();
// RF12: Cadastro de Consulta
router.post("/", (req: Request, res: Response) => {
  const animalExists = (id: string) => !!animalController.read(id);
  const result = consultaController.create(req.body, animalExists);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF13: Consulta de Consulta
router.get("/:id", (req: Request, res: Response) => {
  const result = consultaController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF14: Listagem de Consultas
router.get("/", (_req: Request, res: Response) => {
  const result = consultaController.list();
  res.json(result);
});

// RF15: Atualização de Consulta
router.patch("/:id", (req: Request, res: Response) => {
  const result = consultaController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF16: Remoção de Consulta
router.delete("/:id", (req: Request, res: Response) => {
  const result = consultaController.delete(req.params.id);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

// RF17: Listar Consultas por Animal
router.get("/animal/:animalId", (req: Request, res: Response) => {
  const result = consultaController.listByAnimal(req.params.animalId);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

export default router;
