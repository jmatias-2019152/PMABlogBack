
import Router from 'express';
import { createComment, updateComment, deleteComment, getCommentsByPostId } from '../comment/comment.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';


const router = Router();

router.post("/create", verifyToken, createComment);
router.put("/:id", verifyToken, updateComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/post/:postId", getCommentsByPostId);

export default router;

