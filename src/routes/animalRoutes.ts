import { Router, Request, Response } from "express";
import { AnimalController } from "../controllers/AnimalController";
import { TutorController } from "../controllers/TutorController";

const router = Router();
const animalController = new AnimalController();
const tutorController = new TutorController();
// RF06: Cadastro de Animal
router.post("/", (req: Request, res: Response) => {
  const tutorExists = (id: string) => !!tutorController.read(id);
  const result = animalController.create(req.body, tutorExists);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF07: Consulta de Animal
router.get("/:id", (req: Request, res: Response) => {
  const result = animalController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF08: Listagem de Animais
router.get("/", (_req: Request, res: Response) => {
  const result = animalController.list();
  res.json(result);
});

// RF09: Atualização de Animal
router.patch("/:id", (req: Request, res: Response) => {
  const result = animalController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF10: Inativação de Animal
router.delete("/:id", (req: Request, res: Response) => {
  const result = animalController.delete(req.params.id);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});


// RF11: Listar Animais por Tutor
router.get("/tutor/:tutorId", (req: Request, res: Response) => {
  const result = animalController.listByTutor(req.params.tutorId);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

export default router;
