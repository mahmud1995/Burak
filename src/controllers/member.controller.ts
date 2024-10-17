import {Request, Response} from 'express';
import { T } from "../libs/types/common";
import { LoginInput, Member, MemberInput } from '../libs/types/member';
import MemberService from '../models/Member.service';
import Errors, { HttpCode } from '../libs/Errors';
import AuthService from '../models/Auth.service';
import { AUTH_TIMER } from '../libs/config';
// import { MemberType } from '../libs/enums/member.enum';
//                      REACT
const memberService = new MemberService();

const authService = new AuthService();

const memberController: T = {};
memberController.signup = async (req: Request, res:Response) => {
    try {
        console.log("signup");        
        const input: MemberInput = req.body,
            result: Member = await memberService.signup(input);
        const token = await authService.createToken(result);
            
        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000, 
            httpOnly: false,
        })


        res.status(HttpCode.CREATED).json({member: result, accessToken: token });
    } catch (err) {
        console.log("Error, signup:", err);
        res.status(Errors.standard.code).json(Errors.standard);
    }
};



memberController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        console.log("body:", req.body);  // // // Fixed
        const input: LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);

        res.cookie("accessToken", token, {maxAge: AUTH_TIMER*3600*1000, httpOnly:false});

        res.status(HttpCode.OK).json({member:result , accessToken: token })
        // res.json({ member: result });
    } catch (err) {
        console.log("Error, processLogin:", err);
        res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default memberController;