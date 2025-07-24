import { Request, Response } from "express";
import { userModel } from "../models/userModel";

export const registerUser= async (req:Request, res: Response): Promise<any>=>{
    try {
        const {name,
            ap,
            am,
            email,
            password}=req.body;

        //Validar que venga todo:
        if(!name||
            !ap||
            !am||
            !email||
            !password){
            return res.status(400).json({
                msg:" faltan datos para registrar al user"
            })                     //devolvemos un json
        }


        const rol= "Usuario"
   

        const registered= await userModel.create({
            name,
            ap,
            am,
            email,
            password,
            rol
        })

        return res.status(200).json({msg:"usuario registrado con exito.", registered})


    } catch (error) {
        console.log("Error al registrar al conductor")
        console.log(error)
        return res.status(500).json({msg:"Fallo al intentar registrar al conductor."})
    }
}

export const allUsers= async (req:Request, res: Response): Promise<any>=>{
    try {

        const allUsers = await userModel.find()
        return res.status(200).json({msg:"Todos los usuarios son: ", allUsers})


    } catch (error) {
        console.log("Error al traer usuarios")
        console.log(error)
        return res.status(500).json({msg:"Fallo al intentar traer usuarios."})
    }
}

export const oneUser= async (req:Request, res: Response): Promise<any>=>{
    try {
        const {name}=req.body;

        //Validar que venga todo:
        if(!name){
            return res.status(400).json({
                msg:" faltan datos para buscar al user"
            })                     //devolvemos un json
        }

        const userFound= await userModel.find({name:name})

        return res.status(200).json({msg:"usuario encontrado con exito.", userFound})


    } catch (error) {
        console.log("Error al encontrar al usuario")
        console.log(error)
        return res.status(500).json({msg:"Fallo al intentar encontrar al usuario."})
    }
}

export const deleteUser = async (req:Request, res: Response): Promise<any>=>{
    try {
        const {userID} = req.body
        console.log(userID)


        if(!userID){
            return res.status(400).json({msg:"No se recibieron datos", userID})
        }

        const userEliminado = await userModel.deleteOne({_id:userID})
        console.log("Se supoe elimine la del id", userID)
        return res.status(200).json({msg:"Todo bien, ya la elimine"})


    } catch (error) {
        return res.status(500).json({msg:"Algo salio mal en el servidor"})
    }
}

export const singin = async (req:Request, res:Response):Promise<any>=>{
    try{
        const user = await userModel.findOne({email:req.body.email, password:req.body.password} )

        if(!user){
            return res.status(400).json({
                msg: "No existe usuario"
            })
        }

        return res.status(200).json({
            msg: "Usuario existe"
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error ingresar el usuario"
        })
    }
}


