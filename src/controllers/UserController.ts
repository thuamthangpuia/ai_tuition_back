import { Request, Response}from 'express'
import { checkUserLogin } from '../middleware/checkUserLogin.ts'
import { getUserProfileService, updateUserProfileService } from '../services/userService.ts'


//contains user data;

export async function getUserProfileController ( req : Request ,res :Response){
  const isLoggedIn =await checkUserLogin(req)
  if ( !isLoggedIn) {
    res.status(401).json({message : 'User not logged in'})
    return
  }
  const currentUserId= Number(req.session.userId) 
  const result=await getUserProfileService(currentUserId)
  console.log(result)
  if (result.status === "ERROR"){
     res.status(500).json(result)
  } else {
    
     res.status(200).json(result)
    
  }}

export async function updateUserProfileController ( req : Request , res : Response ) {
    if(!req.query.full_name || !req.query.user_type){
      res.status(400).json({message : 'Invalid param'})
      return
    }
  const isLoggedIn =await checkUserLogin(req)
  if ( !isLoggedIn) {
    res.status(401).json({message : 'User not logged in'})
    return
  }
  const currentUserId= Number(req.session.userId)
  
  const result = await updateUserProfileService(req.query,currentUserId)
  res.status(200).json(result)
}

