import { Date, Document } from 'mongoose';

export default interface IMember extends Document {
    Name: string;
    Email: string;
    Address: string;
    Birthdate: string;
    Entrancedate: string;
}
