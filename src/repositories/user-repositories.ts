import { db } from "../config/dbconfig.ts";
import { Profiles } from "../models/profile.ts";
;
import { Status } from "../interfaces/status-interface.ts";
import { User } from "../interfaces/user-interface.ts";
import { Users } from "../models/user.ts";
import { eq, InferInsertModel } from "drizzle-orm";
import { ProfileType } from "../types/ProfileType.ts";



export async function createUserRepository(userdata: User,profiledata:Partial<ProfileType>): Promise<any> {
    try{
    const result =await db.transaction(async(tx)=>{
    const outputID=await db.insert(Users).values({
            username : userdata.username,
            password : userdata.password,
            email : userdata.email,
            phone :userdata.phone,
        }).returning({id:Users.id})

        const fullname =profiledata.full_name as string
        const usertype = profiledata.user_type as string 
        const profileToInsert:ProfileType= {
            user_id: outputID[0].id,
            full_name :fullname,
            user_type : usertype 
         }
         if(profiledata.address){
            profileToInsert.address=profiledata.address
         }
        if(profiledata.dob){
                    profileToInsert.dob=profiledata.dob
         }

         if(profiledata.gender){
            profileToInsert.gender=profiledata.gender
        }
        if(profiledata.school){
           profileToInsert.school=profiledata.school
        }
        await db.insert(Profiles).values(profileToInsert)
         }) 

    return result
    }
    catch(e){
        return e
    }
}

export async function userLoginRepository(username: string): Promise<any> {
    try{
    // const query = "SELECT id,username,password FROM users WHERE username = $1;";
    // console.log('username is ',username)
    // const insert = await client.query(query,[username])
    // console.log('INSERT IS ',insert)
    const result = await db.select().from(Users).where(eq(Users.username,username))
    console.log('login sql result ',result)
    return result;// 
    }
    catch(e){
        return e
    }
   
}

export async function getUserByIdRepository(id: number): Promise<any> {
    try{
    // const query = "SELECT username,email,phone FROM users where id= $1 ;";
    // const insert = await client.query(query,[id])
    const idAsNumber = id

    const result = await db.select().from(Users).where(eq(Users.id,idAsNumber));

   
    return result;
    }
    catch(e){
        return e
    }
}

export async function getUserByUsernameRepository(username:string):Promise<any>{
    try{
        // const query = "SELECT id,username,email,phone FROM users WHERE username= $1 ;" ;
        // const insert = await client.query(query,[username])

        const result =await  db.select().from(Users).where(eq(Users.username,username))
        return result

    }
    catch(e){
        return e
    }
}
export async function getProfileRepository(userId:number):Promise<any>{
    try{
        const inputId=userId
        const result = await db.select().from(Profiles).where(eq(Profiles.user_id,inputId))
        return result
    }
    catch (e){
        return e
    }

}

export async function createProfileRepository(data : ProfileType ):Promise<any>{
    
    try{
        const result = await db.insert(Profiles).values(
        data)
        return result
        
    }
    catch(e){
        return e
    }
}

export async function updateProfileRepository ( data :Partial<ProfileType>,id : number): Promise<any>{

    try {
        

        const result = await db.update(Profiles).set(data).where(eq(Profiles.user_id,id))
        return result
    }
    catch(e){
        return e 
    }
}

