import express from "express";
import {
  getBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchCars,
} from "../controllers/branchController.js";

import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin"), getBranches)
  .post(protect, authorize("admin"), createBranch);

router
  .route("/:id")
  .get(protect, authorize("admin", "client") ,getBranch)
  .put(protect, authorize("admin"), updateBranch)
  .delete(protect, authorize("admin"), deleteBranch);

router.route("/car/:id")
    .get(protect, authorize("admin"), getBranchCars);

export default router;
