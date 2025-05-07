import express from "express";
import {
  createPayment,
  getPayments,
  getPayment,
  updatePaymentStatus,
  getPaymentTypes,
} from "../controllers/paymentController.js";

import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
    .get(protect, authorize("admin"), getPayments)
    .post(createPayment);

router.route('/:id')
    .get(protect, authorize("admin", "client") ,getPayment)
    .put(protect, authorize("admin"), updatePaymentStatus);

router.route('/types')
    .get(protect, authorize("admin","client") ,getPaymentTypes);

export default router;
