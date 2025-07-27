import  { Application, Response, Request } from "express";
import cors from "cors";
import express from "express"
import { allUsers, deleteUser, oneUser, registerUser, singin } from "./controllers/userController";
import { getSugested, uploadText } from "./controllers/TextController";





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
app.post("/user/sign", singin)

app.post("/text/upload", uploadText)
app.get("/text/sugested", getSugested)

export default app;