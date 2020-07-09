import { ISubject } from './ISubject';

export interface ISchool{
    school_id:Number,
    name:String,
    url_name:String,
    street:String,
    city_town:String,
    zip_code:String,
    parish_id:String,
    country_id:String,
    phone_num1:String,
    phone_num2:String,
    fax:String,
    email:String,
    logo:String,
    motto:String,
    about_school:String,
    enable:String,
    show_on_site:String,
    date_added:String,
    subject_list:Array<ISubject>,
    state:{id:number, name:string},
    country:{id:number, name:string}
}