import { Router } from "express";
import { handleContactSubmission } from "../controllers/contact.controller.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/", contactLimiter, handleContactSubmission);

export default router;
