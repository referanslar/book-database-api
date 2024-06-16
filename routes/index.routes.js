import express from "express";

import indexController from "../controllers/index.controller.js";

import authRotes from "./auth.routes.js";
import authorsRoutes from "./authors.routes.js";
import swaggerRoutes from "./swagger.routes.js";

const router = express.Router();

router.get("/", indexController.welcomePage);

router.use("/auth", authRotes).use("/authors", authorsRoutes).use("/swagger", swaggerRoutes);

export default router;
