import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';

const NAMESPACE = 'Users';

//Protected route to make sure token is working properly
const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized');

    return res.status(200).json({
        message: 'Authorized'
    });
};

//create new user
const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;
    bcryptjs.hash(password, 10, (hashError, hash) => {
        if(hashError){
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        //Insert user into DB

        
    });
};

//log in user
const login = (req: Request, res: Response, next: NextFunction) => {};

//Get users without passwords
const getAllusers = (req: Request, res: Response, next: NextFunction) => {};

export default {
    validateToken,
    register,
    login,
    getAllusers
};
