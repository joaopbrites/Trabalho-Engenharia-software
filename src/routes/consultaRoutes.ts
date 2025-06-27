import { Router, Request, Response } from "express";
import { ConsultaController } from "../controllers/ConsultaController";
import { AnimalController } from "../controllers/AnimalController";

const router = Router();
const consultaController = new ConsultaController();
const animalController = new AnimalController();
// RF12: Cadastro de Consulta
router.post("/", async (req: Request, res: Response) => {
  const animalExists = async (id: string) => {
    const animal = await animalController.read(id);
    return !("error" in animal);
  };
  const result = await consultaController.create(req.body, animalExists);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF13: Consulta de Consulta
// RF13: Consulta de Consulta
router.get("/:id", async (req: Request, res: Response) => {
  const result = await consultaController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF14: Listagem de Consultas
router.get("/", async (_req: Request, res: Response) => {
  const result = await consultaController.list();
  res.json(result);
});

// RF15: Atualização de Consulta
router.patch("/:id", async (req: Request, res: Response) => {
  const result = await consultaController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF16: Remoção de Consulta
router.delete("/:id", async (req: Request, res: Response) => {
  const result = await consultaController.delete(req.params.id);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

// RF17: Listar Consultas por Animal
router.get("/animal/:animalId", async (req: Request, res: Response) => {
  const result = await consultaController.listByAnimal(req.params.animalId);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

export default router;
