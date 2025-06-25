import { ParsedQs } from "qs"
import { checkUserLogin } from "../middleware/checkUserLogin.ts"
import { registerUserService, userLoginService } from "../services/authService.ts"
import { Request,Response } from "express"
import { RegisterUser } from "../interfaces/registerUser-interface.ts"
//contains authentication log ( login/logout/register...)
export async function registerUserController(req :Request , res: Response) { 
    if(!req.query.user_type){
        res.status(500).json({message:"Incomplete param"  })
     }
    const userType = req.query.user_type as string
  if (!req.query.username||!req.query.password||req.query.email||!req.query.phone||!req.query.full_name||!isUsertype(userType)){
    res.status(500).json({message : "No username param"})
    return
  }
  const username=req.query.username as string
  const password=req.query.password as string
  const email=req.query.email as string
  const phone=req.query.phone as string
  const full_name=req.query.full_name as string
  const user_type=req.query.user_type as string
  const query : RegisterUser ={username,password,email,phone,full_name,user_type
  }

  if(req.query.address){
    const address = req.query.address as string
    query.address=address
  }
  if(req.query.dob){
    const dob = req.query.dob as string
    query.dob=dob
  }
  if(req.query.gender){
    const gender = req.query.gender as string
    query.gender=gender
  }
  if(req.query.school){
    const school = req.query.school as string
    query.school=school
  }
  
 
  const result = await registerUserService(query)

  if (result.status === 'ERROR'){
    res.status(result.code).json(result)
  }
  else{
    console.log("controller",result)
    res.status(result.code).json(result)
  }
  
} 

export async function userLoginController ( req: Request , res :Response){
  if (await checkUserLogin(req)){
    console.log('User is already logged in')
    res.status(409).json({status:'ERROR',code:409,message : 'User already logged in'})
    return 
  }
  const username = req.query.username as string;
  const password = req.query.password as string;
  console.log('logincontroller ,username nad pass', username,password)
  const result = await userLoginService(username,password)
  console.log('get result', result)
  if (result.status === "ERROR"){
    res.status(result.code).json(result)
  }
   
  else {
    const userId = result.message
    req.session.userId=userId
    console.log(req.session)
    res.status(200).json({message : 'User logged in '})
    
    
  }

}



 export async function userLogoutController(req: Request, res: Response) {
    
    
    try {
      req.session.destroy
      res.clearCookie("connect.sid")
      res.status(200).json({status:"OK",code:200,message : "Logged out successfully"})
    }
    catch (err){
       res.status(500).json({status:"ERROR",code:500,message:"Logout failed", error :err})
    }
}


function isUsertype(user_type: string) : boolean {
    const UserTypes=['student','teacher','admin']
    if(typeof user_type !== 'string'){
        return false
    }
    const userTypeinLower=user_type.toLowerCase()
    return UserTypes.includes(userTypeinLower)
}

