import { model, Schema } from "mongoose";
import { IText } from "../GlobalTypes";

const textEsquema= new Schema<IText>({
    title:{
        type: String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    estimatedLevel:{
        type:String,
        required:true
    }
})

export const textModel= model("TEXTS", textEsquema)
