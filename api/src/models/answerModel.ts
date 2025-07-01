import { model, Schema } from "mongoose";
import { IAnswers } from "../GlobalTypes";

const answerSchema= new Schema<IAnswers>({
    id_Question:{
        type: Number,
        required:true
    },
    answerContent:{
        type:String,
        required:true
    },
    id_user:{
        type:Number,
        required:true
    }
})

export const AnswerModel= model("ANSWER", answerSchema);