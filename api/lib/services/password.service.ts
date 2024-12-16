import PasswordModel from "../models/password.model";
import bcrypt from 'bcrypt';

class PasswordService {
    public async createOrUpdate(data: any) {
        const result = await PasswordModel.findOneAndUpdate(
            { userId: data.userId },
            { $set: {password: data.password }},
            { new: true }
        );
        if(!result) {
            const dataModel = new PasswordModel({
                userId: data.userId, password: data.password
            });
            return await dataModel.save();
        }
        return result;
    }

    public async authorize(userId: string, password: string) {
        try {
            const result = await PasswordModel.findOne({userId: userId, password: password});
            if(result) return true;
        } catch (err) {
            console.error('PasswordService: Błąd autoryzacji użytkownika: ', err);
            throw new Error('PasswordService: Błąd autoryzacji użytkownika.');
        }
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('hash', hashedPassword);
        return hashedPassword;
    }
}

export default PasswordService;