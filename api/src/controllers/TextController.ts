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

export const bringAllText= async (req: Request, res: Response,): Promise<any> => {
    try {
       const allTexts= textModel.find()

       if(!allTexts){//configuramos un mensjae cuando no haya textos
        return res.status(200).json({"msg":"No hubo error, no hay textos"})
       }
       return res.status(200).json({"msg":"Encontre estos textos:", allTexts})
    } catch (error) {
        return res.status(500).json({"msg":"Hubo un fallo del lado del servidor", "error":error})
    }
  
}

//el siguiente endpoint no se que tan idoneo sea. Se supone es el jale de la IA, pero como no se como funcione, por eso solo dejo el comentario.
//-Marco
export const getSugested = async (req:Request, res:Response):Promise<any>=>{

    try{
        const text = await textModel.find({email:req.body.estimatedLevel} )
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

export const updateText= async (req: Request, res: Response,): Promise<any> => {
    try {
        const id =req.body.id
        const titleReceived = req.body.title 
        const contentReceived = req.body.content
        const estimatedLevelReceived = req.body.estimatedLevel 

        if (!titleReceived || !contentReceived || !estimatedLevelReceived){
            return res.status(400).json({
                msg: "faltan datos para actualizar el texto"
            })
        }

        const text = await textModel.findOneAndUpdate({_id:id}, 
            {title:titleReceived, content:contentReceived, estimatedLevel:estimatedLevelReceived},
            {new:true}
        )

        return res.status(200).json({
            msg: "texto actualizado con exito",
            "TituloActualizado":text?.title,
            "nivelActualizado":text?.estimatedLevel,

        })
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al actualizar el texto",
        })
    }
}

export const deleteText= async(req:Request, res:Response):Promise<any>=>{
        try {
            const id = req.body.id

         if (!id){
            return res.status(400).json({
                msg: "falta el id"
            })
        }
            const deleted = textModel.findOneAndDelete({_id:id})

                  return res.status(200).json({"msg":"eliminado con exito"})

        } catch (error) {
            
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error al actualizar el texto",
        })
        }
}

