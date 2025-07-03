import { Schema } from "mongoose";


export interface IUser {
    name: string;
    ap:string;
    am:string;
    email: string;
<<<<<<< HEAD
    password:string;
=======
    password: string;
>>>>>>> bfb51fa8bd978163f18c1daa794d361f284dbf25
    rol:string;
   
}

export interface IText {
    title: string;
    content:string;
    estimatedLevel:string;
   
}
<<<<<<< HEAD
=======


export interface IAnswers {
    id_Question: number;
    answerContent:string;
    id_user:number;
   
}
>>>>>>> bfb51fa8bd978163f18c1daa794d361f284dbf25
