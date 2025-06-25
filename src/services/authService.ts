import * as argon2 from "argon2"
import { User } from "../interfaces/user-interface.ts";
import { createUserRepository, getProfileRepository, getUserByIdRepository, getUserByUsernameRepository, userLoginRepository } from "../repositories/user-repositories.ts";
import { Status } from "../interfaces/status-interface.ts";
import { RegisterUser } from "../interfaces/registerUser-interface.ts";

// notetoself :Layer hran atanga session userid lak a buaithlak
export async function registerUserService( userdata :RegisterUser) : Promise <Status> { 
    try {
        const {username,password,email,phone} = userdata
        const {full_name,user_type,address,dob,gender,school}=userdata
        
        
        const hash = await argon2.hash(password)
        console.log( 'SERVICE userdata is' ,{username,password:hash,email,phone})
        const call= await createUserRepository({username,password:hash,email,phone},{full_name,user_type,address,dob,gender,school})
        console.log("call", call)
        return {status : 'OK',code : 201 , message : call} as Status // 201 (created)

    }
    catch (e){
        
        return {status : 'ERROR',code : 500 , message : e} as Status
}
}

export async function userLoginService(username : string,password:string) : Promise <Status>{
    try {
        const checkUser=await userLoginRepository(username) 
        console.log('checkuser login result' , checkUser, 'and password is ' , password )
        if(checkUser===undefined){
            return{status:'ERROR', code:404,message:'User does not exist'} // 404 Not Found
        }
        if(await argon2.verify(checkUser[0].password,password)){
            return {status : 'OK',code : 200 , message : checkUser[0].id } as Status // 200 OK
        }
        else{
            return {status : 'ERROR',code : 401 , message : 'Incorrect Password' } as Status // 401 Unauthorized
        }   
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

