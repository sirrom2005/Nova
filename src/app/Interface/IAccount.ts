export interface IAccount
{
    acconut_id:number,
    firstname: String,
    middlename:String,
    lastname:String,
    gender:String,
    email:String,
    street:String,
    city_town:String,
    zip_code:String,
    parish_id:number,
    country_id:number,
    phone_home:String,
    phone_mobile:String,
    dob:String,
    enrollment_date:String,
    account_type:number,
    accountschool:{school_id:number},
    classroom:{class_room_id:number},
    qualification:{},
    housecolor:{id:number},
    extra_curricular_activity: [],
    responsibilities: [],
    citizenship: []
};

