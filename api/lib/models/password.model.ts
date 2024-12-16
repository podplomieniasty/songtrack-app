import { model, Schema } from "mongoose";

export interface IPassword {
    userId: Schema.Types.ObjectId;
    password: string;
}

const PasswordSchema = new Schema<IPassword>({
    userId: {type: Schema.Types.ObjectId, ref: 'user', required: true, unique: true},
    password: {type: String, reqired: true}
});

export default model<IPassword>('songtrack_db_passwords', PasswordSchema);