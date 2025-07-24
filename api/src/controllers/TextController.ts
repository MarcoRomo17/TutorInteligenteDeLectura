import { Request, Response } from "express";
import { textModel } from "../models/TextModel";

export const uploadText= async (req: Request, res: Response,): Promise<any> => {
    try {

        const title = req.body.title 
        const content = req.body.content
        const estimatedLevel = req.body.estimatedLevel 

        if (!title || !content || !estimatedLevel){
            return res.status(400).json({
                msg: "faltan datos para subir texto"
            })
        }

        const text = await textModel.create({
            title,
            content,
            estimatedLevel
        })

        return res.status(200).json({
            msg: "texto registrado con exito",
        })
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al crear el texto"
        })
    }
}

export const getSugested = async (req:Request, res:Response):Promise<any>=>{

    try{
        const text = await textModel.find({estimatedLevel:req.body.estimatedLevel} )
        if(!text){
            return res.status(400).json({
                msg: "No hay textos recomendados"
            })
        }

        return res.status(200).json({
            msg: "Hay textos",
            text
        })

    }catch(error){
        return res.status(500).json({
            msg: "Hubo un error al buscar el texto"
        })
    }
}