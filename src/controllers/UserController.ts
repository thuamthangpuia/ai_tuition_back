import { Request, Response}from 'express'
import { checkUserProfileService, registerUserService, userLoginService } from '../services/authService.ts'
import { checkUserLogin } from '../middleware/checkUserLogin.ts'

export async function registerUserController(req :Request , res: Response) { 

  if (!req.query.username){
    res.status(500).json({message : "No username param"})
  }
  if (!req.query.password){
    res.status(500).json({message : "No password param"})
  }
  if (!req.query.email){
    res.status(500).json({message : "No email param"})
  }
  if (!req.query.phone){
    res.status(500).json({message : "No phone param"})
  }
  const username = req.query.username as string
  const password = req.query.password as string
  const email = req.query.email as string
  const phone = req.query.phone as string
  const query = {username,password,email,phone}
 
  const result = await registerUserService(query)

  if (result.status === 'ERROR'){
    res.status(500).json(result)
  }
  else{
    console.log("controller",result)
    res.status(200).json(result)
  }
  
} 

export async function userLoginController ( req: Request , res :Response){
  if (await checkUserLogin(req)){
    console.log('User is already logged in')
    res.status(400).json({status : 'OK', code : 400, message : 'User already logged in'})
    return 
  }
  const username = req.query.username as string;
  const password = req.query.password as string;
  console.log('logincontroller ,username nad pass', username,password)
  const result = await userLoginService(username,password)
  console.log('get result', result)
  if (result.status === "ERROR"){
    res.status(500).json(result)
  }
  
  else {
    const userId = result.message
    req.session.userId=userId
    console.log(req.session)
    res.status(200).json({message : 'User logged in '})
    
    
  }

}

export async function userProfileController ( req : Request ,res :Response){
  
  if (!checkUserLogin(req)) {
    res.status(400).json({status : 'OK',code : 200 , message : 'User not logged in'})
    return
  }
  const currentUserId= req.session.userId as string
  const result=await checkUserProfileService(currentUserId)
  if (result.status === "ERROR"){
     res.status(500).json(result)
  } else {
    
     res.status(200).json(result)
    
  }}

 export async function userLogoutController(req: Request, res: Response) {
    
    
    try {
      req.session.destroy
      res.clearCookie("connect.sid")
      res.status(200).json({status:"OK",message : "Logged out successfully"})
    }
    catch (err){
       res.status(500).json({status:"ERROR",message:"Logout failed", error :err})
    }
}


