import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload, decode } from "jsonwebtoken"
import config from '../config'

const adminAuth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // if the token is send from the client

    const  tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(" ")[1];
    console.log(token);

    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
    }

    // if the token is valid 
    const verifyToken = jwt.verify(token, config.JWT_SECRET as string, function(err, decoded) {
        if(err){
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
        }
        // decoded undefined

        if(decoded?.role !== "admin"){
            throw new AppError(httpStatus.UNAUTHORIZED, "Your are not admin");
        }

        req.user = decoded as JwtPayload;
        next();
        
    })
    
    }) //
  
}

export default adminAuth
