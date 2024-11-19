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
    spotifyId: {type: String, default: '', required: true},
    img: {type: String, default: '', required: true},
    name: {type: String, required: true},
    artist: {type: String, required: true},
    href: {type: String, required: true},
    movies: {type: Array<IMovie>, default: []}
})

export default model<ITrack>('SONGTRACK_DB_TRACK', TrackSchema);