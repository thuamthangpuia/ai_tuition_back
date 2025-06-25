export interface User {
    id? : number,
    username : string ,
    password : string ,
    email: string,
    phone : string ,
    created_at? : string,
}

export interface Register {
    username :string , 
    password : string ,
    email: string , 
    phone : string ,
    full_name : string , 
    address : string ,
}