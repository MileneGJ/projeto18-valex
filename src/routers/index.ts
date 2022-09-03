import cardRouters from "./cardRouters";
import { Router } from "express";
import rechargeRouters from "./rechargeRouters";
import paymentRouters from "./paymentRouters";

const router = Router()

router.use(cardRouters)
router.use(rechargeRouters)
router.use(paymentRouters)

export default router