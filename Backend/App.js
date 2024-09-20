import express, { urlencoded } from "express";
import cors from "cors";
import { config } from 'dotenv'
import cookieParser from "cookie-parser";
import './DB/Connection.js'
import router from "./Routes/Router.js";
import fileUpload from "express-fileupload";
import { ErrorMiddleware } from "./Middlewares/ErrorHandler.js";
import jobRouter from "./Routes/JobRoutes.js";
import applicationRouter from "./Routes/ApplicationRoutes.js";

const app = express();
app.use(cors({
    origin: ["http://localhost:3000","http://192.168.29.78:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.options('*', cors()); 

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:""
}))
app.use("/api/user",router);
app.use("/api/jobs",jobRouter);
app.use("/api/application",applicationRouter);
app.use(ErrorMiddleware)
config({ path: "./Config/config.env" })
export default app;