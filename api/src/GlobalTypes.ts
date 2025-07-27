import { Schema } from "mongoose";


export interface IUser {
    name: string;
    ap:string;
    am:string;
    email: string;
    password: string;
    rol:string;
   
}

export interface IText {
    title: string;
    content:string;
    estimatedLevel:string;
   
}


export interface IAnswers {
    id_Question: number;
    answerContent:string;
    id_user:number;
   
}
