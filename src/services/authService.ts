import * as argon2 from "argon2"
import { User } from "../models/user-interface.ts";
import { createUserRepository, getProfileRepository, getUserByIdRepository, getUserByUsernameRepository, userLoginRepository } from "../repositories/user-repositories.ts";
import { Status } from "../models/status-interface.ts";


export async function registerUserService( userdata :User) : Promise <Status> {
    try {
        const {username,password,email,phone} = userdata
        const hash = await argon2.hash(password)
        console.log( 'SERVICE userdata is' ,{username,password:hash,email,phone})
        const call= await createUserRepository({username,password:hash,email,phone})
        console.log("call", call)
        return {status : 'OK',code : 200 , message : call} as Status

    }
    catch (e){
        return {status : 'ERROR',code : 500 , message : e} as Status
}
}

export async function userLoginService(username : string,password:string) : Promise <Status>{
    try {
        const hashedPassword = await argon2.hash(password)
        const checkUser=await userLoginRepository(username) 
        console.log('checkuser login result' , checkUser, 'and password is ' , password )
        if(checkUser===undefined){
            return{status:'ERROR', code:500,message:'User does not exist'}
        }
        if(await argon2.verify(checkUser[0].password,password)){
            return {status : 'OK',code : 200 , message : checkUser.id } as Status
        }
        else{
            return {status : 'OK',code : 200 , message : 'Incorrect Password' } as Status
        }   
    }
    catch (e){
        return {status : 'ERROR',code : 500 , message : e} as Status;
    }

}

export async function checkUserProfileService(id : string) : Promise < Status>{
    try {
        const checkUser=await getUserByIdRepository(id) 
        if(checkUser===undefined){
            return{status:'ERROR', code:500,message:'No users found'}
        }
        const profileInfo= await getProfileRepository(id)

        return {status : 'OK',code : 200 , message : profileInfo[0]} as Status
    }
    catch (e){
        return {status : 'ERROR',code : 500 , message : e} as Status;
    }

}

export async function checkIfUserExists(username: string) : Promise <boolean>{
    const ifUserExists = await getUserByUsernameRepository(username)
    if(ifUserExists===undefined){
        return false
    }
    else return true
}

