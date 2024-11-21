import { model, Schema } from "mongoose";
import { IMovie } from "./movie.model";

export interface ITrack {
    spotifyId: string;
    img: string;
    name: string;
    artist: string;
    href: string;
    movies: IMovie[];
}

export type Query<T> = {
    [key: string]: T;
}

const TrackSchema: Schema = new Schema({
    spotifyId: {type: String, default: ''},
    img: {type: String, default: ''},
    name: {type: String, default: ''},
    artist: {type: String, default: ''},
    href: {type: String, default: ''},
    movies: {type: Array<IMovie>, default: []}
})

export default model<ITrack>('SONGTRACK_DB_TRACK', TrackSchema);