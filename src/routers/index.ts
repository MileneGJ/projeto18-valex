import cardRouters from "./cardRouters";
import { Router } from "express";
import rechargeRouters from "./rechargeRouters";

const router = Router()

router.use(cardRouters)
router.use(rechargeRouters)

export default router