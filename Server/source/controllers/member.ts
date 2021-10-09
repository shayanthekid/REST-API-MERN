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
        .then((member) => {
            return res.status(201).json({
                member
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllMembers = (req: Request, res: Response, next: NextFunction) => {
    Member.find()
        .exec()
        .then((members) => {
            return res.status(200).json({
                members,
                count: members.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getOneMember = (req: Request, res: Response, next: NextFunction) => {
    let { _id } = req.body;

    Member.findById(_id)
        .exec()
        .then((members) => {
            return res.status(200).json({
                members
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const updateMember = (req: Request, res: Response, next: NextFunction) => {
    let { Name, Email, Address, Birthdate, Entrancedate, _id } = req.body;

    const filter = {
        _id
    };
    const New_member = {
        Name,
        Email,
        Address,
        Birthdate,
        Entrancedate
    };

    Member.updateOne(filter, New_member, {
        new: true
    })
        .exec()
        .then((members) => {
            return res.status(200).json({
                message: 'Successfully updated',
                members
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteMember = (req: Request, res: Response, next: NextFunction) => {
    let { _id } = req.body;
    const filter = {
        _id
    };

        Member.deleteOne(filter)
            .then(() => {
                return res.status(200).json({
                    message: 'Successfully Deleted Member'
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });

};
export default {
    register,
    getAllMembers,
    getOneMember,
    updateMember,
    deleteMember
};
