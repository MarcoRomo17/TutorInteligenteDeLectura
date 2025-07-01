
import { Request, Response } from "express";
import { userModel } from "../models/userModel";

export const registrarConductor= async (req:Request, res: Response): Promise<any>=>{
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
                msg:" faltan datos para registrar al conductor"
            })                     //devolvemos un json
        }


        const puntos= 0
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

