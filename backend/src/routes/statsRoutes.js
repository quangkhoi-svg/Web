// src/routes/statsRoutes.js
import express from "express";
import { getStats, incrementVisit } from "../data/stats.js";

const router = express.Router();

// GET /api/stats  -> trả về số lượt truy cập
router.get("/", (req, res) => {
  res.json(getStats());
});

// POST /api/stats/visit -> +1 lượt truy cập
router.post("/visit", (req, res) => {
  const updated = incrementVisit();
  res.json(updated);
});

export default router;
