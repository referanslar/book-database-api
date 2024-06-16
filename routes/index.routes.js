import express from "express";

import indexController from "../controllers/index.controller.js";

import authRotes from "./auth.routes.js";
import swaggerRoutes from "./swagger.routes.js";
import authCheck from "../middleware/auth-check.middleware.js";

const router = express.Router();

router.get("/", indexController.welcomePage);

router.get("/protected", authCheck, (req, res) => {
  const userInfo = req.payload;
  res.json(userInfo);
});

router.use("/auth", authRotes).use("/swagger", swaggerRoutes);

export default router;
