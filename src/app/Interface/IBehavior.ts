export interface IBehavior{
    id:number,
    class_room: {id:number, name:string },
    comments:string,
    conduct: {id:number, name:string, type_id:number},
    date_added:string,
    student_id:string,
    teacher_id:string
};
  
