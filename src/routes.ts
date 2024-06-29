import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController;";

const router = Router();

router.post('/subject', new SubjectController().create)

export default router;