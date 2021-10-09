import { Date, Document } from 'mongoose';

export default interface IMember extends Document {
    Name: string;
    Email: string;
    Address: string;
    Birthdate: Date;
    Entrancedate: Date;
}
