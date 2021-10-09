import mongoose, { Schema } from 'mongoose';
import IMember from '../interfaces/member';

const MemberSchema: Schema = new Schema(
    {
        Name: { type: String, required: true },
        Email: { type: String, required: true },
        Address: { type: String, required: true },
        Birthdate: { type: Date, required: true },
        Entrancedate: { type: Date, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMember>('Member', MemberSchema);
