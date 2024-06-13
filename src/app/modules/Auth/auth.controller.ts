import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async(req,res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res,{
        statusCode: 200,
        success: true,
        data: result,
        message: "Login successfully!"
    })
})

export const AuthControllers = {
    loginUser,
}