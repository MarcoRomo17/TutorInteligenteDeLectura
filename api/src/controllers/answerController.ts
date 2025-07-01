import { Request, Response } from "express";
import { AnswerModel } from "../models/answerModel";

// obtener respuesta a preguntas del tutor inteligente
export const getTutorAnswers = async (req: Request, res: Response) => {
    const id_Question = parseInt(req.params.id_Question);
  
  try {
    const answers = await AnswerModel.find({ id_Question });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar answers'});
  }

};