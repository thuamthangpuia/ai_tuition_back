import { ProfileData } from "../interfaces/profileinfo-interface.ts"
import { Status } from "../interfaces/status-interface.ts"
import { createProfileRepository, getProfileRepository, getUserByIdRepository, updateProfileRepository } from "../repositories/user-repositories.ts"
import { ProfileType } from "../types/ProfileType.ts"

export async function getUserProfileService(id : number) : Promise < Status>{
    try {
        const checkUser=await getUserByIdRepository(id) 
        if(checkUser===undefined){
            return{status:'ERROR', code:404,message:'No users found'} // 404 Not Found
        }
        const profileInfo= await getProfileRepository(id)
        console.log('profileinfo',profileInfo)
        if(profileInfo[0]===undefined){
            return  {status:'ERROR' , code:404,message : 'Profile info does not exist'}
             
        }
        return {status : 'OK',code : 200 , message : profileInfo[0]} as Status // 200 OK
    }
    catch (e){
        return {status : 'ERROR',code : 500 , message : e} as Status; // 500 General error
    }

}

export async function updateUserProfileService( data :Partial<ProfileType>, id: number) : Promise<Status>{
    try{
     
        const updateProfile = await updateProfileRepository(data,id)
        console.log('UPDATE PROFILE RESULT ',updateProfile)
        if (updateProfile===undefined){
            return {status : 'ERROR',code:500,message :"No profile found"}    //?
        }
        
        return {status:'OK',code:200,message : 'success' }
        
    }

    catch(e){
        return {status:'ERROR',code:500,message : e}
    }
    
}
