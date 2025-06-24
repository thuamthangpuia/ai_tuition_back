import { db } from "../config/dbconfig.ts";
import { Profiles } from "../models/profile.ts";
import { Status } from "../models/status-interface.ts";
import { User } from "../models/user-interface.ts";
import { Users } from "../models/user.ts";
import { eq } from "drizzle-orm";


export async function createUserRepository(userdata: User): Promise<any> {
    try{
    // const query = "INSERT INTO users (username,password,email,phone) values ($1 ,$2,$3,$4); ";
    // const insert = await client.query(query,[userdata.username,userdata.password,userdata.email,userdata.phone])
    const result = await db.insert(Users).values({
        username : userdata.username,
        password : userdata.password,
        email : userdata.email,
        phone :userdata.phone,

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

export async function getUserByIdRepository(id: string): Promise<any> {
    try{
    // const query = "SELECT username,email,phone FROM users where id= $1 ;";
    // const insert = await client.query(query,[id])
    const idAsNumber = Number(id)

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
export async function getProfileRepository(userId:string):Promise<any>{
    try{
        const inputId=Number(userId)
        const result = await db.select().from(Profiles).where(eq(Profiles.user_id,inputId))
        return result
    }
    catch (e){
        return e
    }

}



