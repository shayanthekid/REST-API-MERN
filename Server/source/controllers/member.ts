import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Member from '../models/member';

const NAMESPACE = 'Members';

//Create new Member
const register = (req: Request, res: Response, next: NextFunction) => {

    let { Name, Email, Address, Birthdate, Entrancedate } = req.body;

    const _member = new Member({
        _id: new mongoose.Types.ObjectId(),
        Name,
        Email,
        Address,
        Birthdate,
        Entrancedate
    });
    return _member
    .save()
    .then((member)=>{
        return res.status(201).json({
            member
        });
    }).catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });

})
}

const getAllMembers = (req: Request, res: Response, next: NextFunction) => {


}
export default {
    register
};