import { Router, Request, Response } from "express";
import { TutorController } from "../controllers/TutorController";
import { AnimalController } from "../controllers/AnimalController";
import { ConsultaController } from "../controllers/ConsultaController";

const router = Router();
const tutorController = new TutorController();
const consultaController = new ConsultaController();
const animalController = new AnimalController();

// RF01: Cadastro de Tutor
router.post("/", (req: Request, res: Response) => {
  const result = tutorController.create(req.body);
  if ("error" in result) return res.status(400).json(result);
  res.status(201).json(result);
});

// RF02: Consulta de Tutor
router.get("/:id", (req: Request, res: Response) => {
  const result = tutorController.read(req.params.id);
  if ("error" in result) return res.status(404).json(result);
  res.json(result);
});

// RF03: Listagem de Tutores
router.get("/", (_req: Request, res: Response) => {
  const result = tutorController.list();
  res.json(result);
});

// RF04: Atualização de Tutor
router.patch("/:id", (req: Request, res: Response) => {
  const result = tutorController.update(req.params.id, req.body);
  if ("error" in result) return res.status(400).json(result);
  res.json(result);
});

// RF05: Inativação de Tutor
router.delete("/:id", (req: Request, res: Response) => {
  // Função para verificar se o tutor possui animais vinculados
  const hasAnimals = (tutorId: string) => {
    const animais = animalController.listByTutor(tutorId);
    return Array.isArray(animais) && animais.length > 0;
  };
  const result = tutorController.delete(req.params.id, hasAnimals); // <-- Agora com dois argumentos!
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

export default router;

