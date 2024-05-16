import Router from 'express';
import { createPost, updatePost, deletePost, getPostDetails, getPosts, getUserPosts } from '../post/post.controller.js';

const router = Router();

router.post("/create", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPostDetails);
router.get("/", getPosts);
router.get("/user/:userId", getUserPosts);

export default router;