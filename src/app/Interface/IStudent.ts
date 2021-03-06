export interface IStudent 
{ß
    acconut_id:number,
    firstname:string,
    middlename:string,
    lastname:string,
    gender:string,
    email:string,
    street:string,
    city_town:string,
    zip_code:string,
    parish_id:number,
    country:{id:number, name:string},
    country_state:{state_id:number, name:string, country_id:number},
    phone_home:string,
    phone_mobile:string,
    dob:string,
    enrollment_date:string,
    account_type:number,
    account_school:{school_id:number, name:string},
    account_class:{id:number, name:string},
    qualification:{},
    housecolor:{id:number, name:string},
    extra_curricular_activity:[{id:number, name:string}],
    responsibilities:[{id:number, name:string}],
    citizenship:[{id:number, name:string}]
};