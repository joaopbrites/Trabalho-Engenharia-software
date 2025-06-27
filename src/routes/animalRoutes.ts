import { Router, Request, Response } from "express";
import { AnimalController } from "../controllers/AnimalController";
import { TutorController } from "../controllers/TutorController";

const router = Router();
const animalController = new AnimalController();
const tutorController = new TutorController();
// RF06: Cadastro de Animal
router.post("/", async (req: Request, res: Response) => {
  const tutorExists = async (id: string) => {
    const tutor = await tutorController.read(id);
    return !("error" in tutor);
  };
  const result = await animalController.create(req.body, tutorExists);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF07: Consulta de Animal
// RF07: Consulta de Animal
router.get("/:id", async (req: Request, res: Response) => {
  const result = await animalController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF08: Listagem de Animais
router.get("/", async (_req: Request, res: Response) => {
  const result = await animalController.list();
  res.json(result);
});

// RF09: Atualização de Animal
router.patch("/:id", async (req: Request, res: Response) => {
  const result = await animalController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF10: Inativação de Animal
router.delete("/:id", async (req: Request, res: Response) => {
  const result = await animalController.delete(req.params.id);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

// RF11: Listar Animais por Tutor
router.get("/tutor/:tutorId", async (req: Request, res: Response) => {
  const result = await animalController.listByTutor(req.params.tutorId);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

export default router;
