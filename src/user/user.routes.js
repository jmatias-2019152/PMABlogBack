import express from 'express';
import { updateUser, deleteUser, getUserById } from '../user/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUserById);

export default router;