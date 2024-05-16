import Post from '../post/post.model.js'
import Comment from '../comment/comment.model.js'


export const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getPosts = async (req, res) => {
    const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" }
    };
    const posts = await Post.find(query.search ? searchFilter : {});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};