import { Schema } from "mongoose";


export interface IUser {
    name: string;
    ap:string;
    am:string;
    email: string;
    password:string;
    rol:string;
   
}

export interface IText {
    title: string;
    content:string;
    estimatedLevel:string;
   
}
