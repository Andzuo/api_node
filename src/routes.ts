import { RoomController } from './controllers/RoomController';
import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController;";

const router = Router();

router.post('/subject', new SubjectController().create)

router.post('/room', new RoomController().create)

router.post('/room/:idRoom/create', new RoomController().createVideo)

export default router;