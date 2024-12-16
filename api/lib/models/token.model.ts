import { model, Schema } from "mongoose";

export interface IToken {
    userId: Schema.Types.ObjectId;
    createDate: Number;
    type: string;
    value: string;
}

const tokenTypeEnum = {
    authorization: 'authorization'
};

const tokenTypes = [
    tokenTypeEnum.authorization
]

const TokenSchema = new Schema<IToken>({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    createDate: { type: Number, required: true },
    type: { type: String, enum: tokenTypes, required: true },
    value: { type: String, required: true }
});

export default model<IToken>('songtrack_db_tokens', TokenSchema);