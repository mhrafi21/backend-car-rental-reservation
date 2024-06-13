import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

import jwt from "jsonwebtoken"
import config from "../../config";
import { TLoginUser } from "./auth.interface";

const loginUser = async(payload: TLoginUser) => {

    // if the user is exist
    const user = await User.isUserExistsByCustomId(payload?.id);

    if(!user){
      throw new AppError(httpStatus.NOT_FOUND, "This user is not Exists")
    }

    //checking if the user is already deleted

    const isUserDeleted = user?.isDeleted;

    if(isUserDeleted){
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted")
    }

    const isUserIsBlocked = user.status === "blocked";

    if(isUserIsBlocked){
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked") 
    }

    // Access Granted: Send  Access token and after refresh token

    if(!( await User.isPasswordMatched(payload?.password))){
        throw new AppError(httpStatus.FORBIDDEN, "this password is not matched")
    }


    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload,config.JWT_SECRET as string,{expiresIn:  "10d"}) 
 
    return {
        accessToken,
        needsPasswordChange: user.needsPasswordChange

    }


}



export const AuthServices = {
    loginUser
}

