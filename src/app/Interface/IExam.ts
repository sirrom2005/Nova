import { ExamQuestion } from './ExamQuestion';
import { ExamAnswer } from './ExamAnswer';

export interface IExam{ 
    id:number,
    name:string,
    exam_body:Array<ExamQuestion>,
    exam_answer:Array<ExamAnswer>,
    exam_type: {id:number, name: string },
    duration: {id:number, name: string },
    allow_retry:number,
    description:string,
    notes:string,
    subject: {id:number, name: string },
    created_by:number,
    date_added:string,
    date_updated:string
};