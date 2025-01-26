import { model, Schema } from "mongoose";
import { IMovie } from "./movie.model";
import { IGame } from "./game.model";

export interface ITrack {
    spotifyId: string;
    img: string;
    name: string;
    artist: string;
    href: string;
    addDate?: Date;
    updateDate?: Date;
    movies: IMovie[];
    series: IMovie[];
    games: IGame[];
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
    addDate: {type: Date, default: new Date()},
    updateDate: {type: Date, default: new Date()},
    movies: {type: Array<IMovie>, default: []},
    series: {type: Array<IMovie>, default: []},
    games: {type: Array<IGame>, default: []}
})

export default model<ITrack>('SONGTRACK_DB_TRACK', TrackSchema);