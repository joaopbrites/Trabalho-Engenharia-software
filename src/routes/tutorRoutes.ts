import { Router, Request, Response } from "express";
import { TutorController } from "../controllers/TutorController";
import { AnimalController } from "../controllers/AnimalController";

const router = Router();
const tutorController = new TutorController();
const animalController = new AnimalController();

// RF01: Cadastro de Tutor
router.post("/", async (req: Request, res: Response) => {
  console.log("Dados recebidos para criação de tutor:", req.body);
  const result = await tutorController.create(req.body);
  console.log("Resultado da criação:", result);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF02: Consulta de Tutor
router.get("/:id", async (req: Request, res: Response) => {
  const result = await tutorController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF03: Listagem de Tutores
router.get("/", async (_req: Request, res: Response) => {
  const result = await tutorController.list();
  res.json(result);
});

// RF04: Atualização de Tutor
router.patch("/:id", async (req: Request, res: Response) => {
  const result = await tutorController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF05: Hard Delete de Tutor
router.delete("/:id", async (req: Request, res: Response) => {
  // Função para verificar se o tutor possui animais vinculados
  const hasAnimals = async (tutorId: string): Promise<boolean> => {
    const animais = await animalController.listByTutor(tutorId);
    return Array.isArray(animais) && animais.length > 0;
  };
  
  const result = await tutorController.delete(req.params.id, hasAnimals);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

export default router;

