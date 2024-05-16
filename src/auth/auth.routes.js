import { Router } from "express";
import { register, login, logout, refetchUser } from '../auth/auth.controller.js';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refetch", refetchUser);

export default router;