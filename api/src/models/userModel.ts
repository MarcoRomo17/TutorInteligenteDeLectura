import { model, Schema } from "mongoose";
import { IUser } from "../GlobalTypes";

const usersEsquema= new Schema<IUser>({
    name:{
        type: String,
        required:true
    },
    ap:{
        type:String,
        required:true
    },
    am:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true
    }
})

export const userModel= model("USERS", usersEsquema)
