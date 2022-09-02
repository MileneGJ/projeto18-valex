import cardRouters from "./cardRouters";
import { Router } from "express";

const router = Router()

router.use(cardRouters)

export default router