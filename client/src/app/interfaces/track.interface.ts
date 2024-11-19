import IMovie from "./movie.interface";

export default interface ITrack {
    spotifyId: string;
    img: string;
    name: string;
    artist: string;
    href: string;
    movies: IMovie[];
}