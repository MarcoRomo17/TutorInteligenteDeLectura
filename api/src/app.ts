import  { Application, Response, Request } from "express";
import cors from "cors";
import express from "express"
import { allUsers, countAllstudents, countAllTeachers, countAllUsers, deleteUser, loginUser, oneUser, registerTeacher, registerUser } from "./controllers/userController";
import { bringAllText, countAllTexts, deleteText, getSugested, updateText, uploadText } from "./controllers/TextController";





const app:Application = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (_req: Request,res: Response)=>{
    res.send("Hola desde mi servidor con TS")

})
//ENPOINTS

//USER
app.post("/user/register", registerUser)
app.post("/user/registerTeacher", registerTeacher)
app.get("/user/getAll", allUsers)
app.post("/user/oneUser", oneUser)
app.delete("/user/delete", deleteUser)
app.post("/user/sign", loginUser)
app.get("/user/count/all", countAllUsers)
app.get("/user/count/students", countAllstudents)
app.get("/user/count/teachers", countAllTeachers)

//Text

app.post("/text/upload", uploadText)
app.get("/text/bringAll", bringAllText)
app.get("/text/sugested", getSugested)//este no se como hacerlo jalar
app.delete("/text/delete", deleteText)
app.put("/text/update", updateText)
app.get("/text/count/all", countAllTexts)

export default app;