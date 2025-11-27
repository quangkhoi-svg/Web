import express from "express";
import { getServers, getServerById } from "../controllers/serverController.js";

const router = express.Router();

router.get("/", getServers);
router.get("/:id", getServerById);

export default router;
