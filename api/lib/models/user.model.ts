import { model, Schema } from "mongoose";
import { getRandomProfilePicture } from "../utils/img.utils";

export interface IUser {
    _id?: string; 
    name: string;
    email: string;
    img?: string;
    isAdmin?: boolean;
    isSuperUser?: boolean;
    joined: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    img: { type: String, default: getRandomProfilePicture() },
    isAdmin: { type: Boolean, default: false },
    isSuperUser: { type: Boolean, default: false },
    joined: { type: Date, default: Date.now() }
});

export type Query<T> = {
    [key: string]: T;
}

export default model<IUser>('songtrack_db_users', UserSchema);
