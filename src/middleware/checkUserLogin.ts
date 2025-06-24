import { Request } from "express";

export async function checkUserLogin(req:Request): Promise<boolean>{

    if(!req.session.userId) {
        console.log("User not logged in");
        return false;
    }
    else {
        console.log("User is logged in with ID:", req.session.userId);
        return true;
    }
}