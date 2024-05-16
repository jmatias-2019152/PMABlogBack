import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import multer from 'multer'; 
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'




class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "/blog/v1"
        this.userPath = "/blog/v1/user"
        this.postPath = "/blog/v1/post"
        this.commentPath = "/blog/v1/comment"
        this.conectarDB(); 
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use("/images", express.static(path.resolve( "../Backend/images")));
        console.log(path.resolve("../Backend/images"))
        this.app.use(cors({origin: "http://localhost:5173", credentials: true}));
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    
        const storage = multer.diskStorage({
            destination: (req, file, fn) => {
                fn(null, "images")
            },
            filename: (req, file, fn) => {
                fn(null, req.body.img)
            }
        })
    
        const upload = multer({ storage: storage })
        this.app.use("/blog/v1/img/upload", (req, res, next) => {
            upload.single("file")(req, res, (err) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    res.status(500).json({ error: "Failed to upload image" });
                } else {
                    next();
                }
            });
        }, (req, res) => {
            res.status(200).json("Image has been uploaded successfully!");
        });

        
    };

   
    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.postPath, postRoutes);
        this.app.use(this.commentPath, commentRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;