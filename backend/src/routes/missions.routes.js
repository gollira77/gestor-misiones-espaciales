import { Router } from "express";
import {getAllMissions,getMissionById,createMission, updateMission, deleteMission } from "../controllers/mission.controller.js";

const router = Router();

router.get("/", getAllMissions);
router.get("/:id", getMissionById);
router.post("/", createMission);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);

export default router;