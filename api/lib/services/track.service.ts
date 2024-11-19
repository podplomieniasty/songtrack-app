import TrackModel, { ITrack, Query } from "../models/track.model";

class TrackService {
    public async addTrack(track: ITrack) {
        try {
            const model = new TrackModel(track);
            await model.save();
        } catch (err) {
            console.error('Failed to add new Track:', err);
            throw new Error('Failed to add new Track.');
        }
    }

    public async query(query: Query<number | string | boolean>) {
        try {
            const result = await TrackModel.find(query, {
                __v: 0,
                _id: 1
            });
            return result;
        } catch(err) {
            console.error('Query failed:', err);
            throw new Error('Query failed.');
        }
    }
}

export default TrackService;