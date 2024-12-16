import TokenModel from '../models/token.model';
import { config } from '../config';
import jwt from 'jsonwebtoken';

class TokenService {
    public async create(user: any) {
        const access = 'auth';
        const userData = {
            userId: user.id,
            name: user.email,
            isAdmin: user.isAdmin,
            access: access
        };
        
        console.log(config.jwtSecret + ' -- token.service, usunac tego console loga');
        const value = jwt.sign(
            userData,
            config.jwtSecret,
            {
                expiresIn: '3h',
            }
        )

        try {
            const result = await new TokenModel({
                userId: user.id,
                type: 'authorization',
                value,
                createDate: new Date().getTime()
            }).save();
            if(result) return result;
        } catch (error) {
            console.log('TokenService: Błąd tworzenia tokena', error);
            throw new Error('TokenService: Błąd tworzenia tokena');
        }
    };

    public getToken(token: any) {
        return {token: token.value};
    }

    public async remove(userId: string) {
        try {
            const result = await TokenModel.deleteOne({
                userId: userId
            });
            if(result.deletedCount === 0) throw new Error('TokenService: Wystąpił błąd podczas usuwania danych');
            return result;
        } catch (error) {
            console.log('TokenService: Błąd usuwania tokena', error);
            throw new Error('TokenService: Błąd usuwania tokena');
        }
    }

    public async getUserIdByToken(token: string) {
        try {
            const result = await TokenModel.find(
                {
                    value: token  
                }, {
                __v: 0,
                _id: 0
            });
            return result;
        } catch(err) {
            console.error('Query failed:', err);
            throw new Error('Query failed.');
        }
    }

    
}

export default TokenService;