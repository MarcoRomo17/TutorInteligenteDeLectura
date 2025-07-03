import  { Application, Response, Request } from "express";
import cors from "cors";
import express from "express"
import { allUsers, deleteUser, oneUser, registerUser } from "./controllers/userController";
import { uploadText } from "./controllers/TextController";




const app:Application = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (_req: Request,res: Response)=>{
    res.send("Hola desde mi servidor con TS")

})
//ENPOINTS
app.post("/user/register", registerUser)
app.get("/user/getAll", allUsers)
app.post("/user/oneUser", oneUser)
app.delete("/user/delete", deleteUser)

app.post("/text/upload", uploadText)

export default app;