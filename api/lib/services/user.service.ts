import UserModel, { IUser, Query } from "../models/user.model";

class UserService {
    public async createNewOrUpdate(user: IUser) {
        try {
            if(!user._id) {
                const dataModel = new UserModel(user);
                return await dataModel.save();
            } else {
                return await UserModel.findByIdAndUpdate(user._id, {$set: user}, {new: true});
            }
        } catch (err) {
            console.error('UserService: Wystąpił błąd tworzenia danych:', err);
            throw new Error('UserService: Wystąpił błąd tworzenia danych.');
        }
    }

    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await UserModel.find(query, {
                __v: 0,
                _id: 1
            });
            return result;
        } catch(err) {
            console.error('Query failed:', err);
            throw new Error('Query failed.');
        }
    }

    public async getByName(name: string) {
        try {
            const result = await UserModel.findOne({$or: [{name: name}]});
            if(result) return result;
        } catch (err) {
            console.error('UserService: Wystąpił błąd pobierania danych:', err);
            throw new Error('UserService: Wystąpił błąd pobierania danych.');
        }
    }

    // public async updateProjects(userId: string, project: any) {
    //     try {
    //         const result = await UserModel.updateOne({
    //             _id: userId,
    //         }, {
    //             $push: {projects: project} 
    //         })
    //         return result;
    //     } catch (err) {
    //         console.error('UserService: Wystąpił błąd tworzenia danych:', err);
    //         throw new Error('UserService: Wystąpił błąd tworzenia danych.');
    //     }
    // }
}

export default UserService;