export interface IAccount
{
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
    country_id:number,
    phone_home:string,
    phone_mobile:string,
    dob:string,
    enrollment_date:string,
    account_type:number,
    accountschool:{school_id:number},
    classroom:{class_room_id:number},
    qualification:{},
    housecolor:{id:number},
    extra_curricular_activity: [{id:number, name:string}],
    responsibilities: [],
    citizenship: []
};

