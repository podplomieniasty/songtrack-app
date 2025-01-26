import { IGame } from "./game.interface";
import IMovie from "./movie.interface";

export default interface ITrack {
    spotifyId: string;
    img: string;
    name: string;
    artist: string;
    href: string;
    movies: IMovie[];
    series: IMovie[];
    games: IGame[];
    addDate: Date;
    updateDate: Date;
}