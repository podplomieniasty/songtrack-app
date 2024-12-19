import TrackService from "../services/track.service";
import TrackModel, { ITrack } from "../models/track.model"; 

jest.mock("../models/track.model"); 

describe("TrackService", () => {
    let trackService: TrackService;

    beforeEach(() => {
        trackService = new TrackService();
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe("addTrack", () => {
        it("should add a new track", async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };

            const saveMock = jest.fn().mockResolvedValue(track);
            TrackModel.prototype.save = saveMock;

            await trackService.addTrack(track);

            expect(saveMock).toHaveBeenCalledTimes(1);
        });

        it("should throw an error if adding a track fails", async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };

            const errorMessage = "Failed to add new Track.";
            TrackModel.prototype.save = jest.fn().mockRejectedValue(new Error(errorMessage));

            await expect(trackService.addTrack(track)).rejects.toThrowError(errorMessage);
        });
    });

    describe("query", () => {
        it("should return results for a valid query", async () => {
            const query = { spotifyId: "123" };
            const expectedResult = [{ _id: "1", spotifyId: "123" }];

            (TrackModel.find as jest.Mock).mockResolvedValue(expectedResult);

            const result = await trackService.query(query);

            expect(result).toEqual(expectedResult);
            expect(TrackModel.find).toHaveBeenCalledWith(query, {
                __v: 0,
                _id: 1,
            });
        });

        it("should throw an error if query fails", async () => {
            const query = { spotifyId: "123" };
            const errorMessage = "Query failed.";

            (TrackModel.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(trackService.query(query)).rejects.toThrowError(errorMessage);
        });
    });

    describe("updateMovieList", () => {
        it("should update the movie list of an existing track", async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };

            const updateOneMock = jest.fn().mockResolvedValue({ modifiedCount: 1 });
            (TrackModel.updateOne as jest.Mock).mockImplementation(updateOneMock);

            await trackService.updateMovieList(track);

            expect(updateOneMock).toHaveBeenCalledWith(
                { spotifyId: track.spotifyId },
                { $push: { movies: track.movies[0] } }
            );
            expect(updateOneMock).toHaveBeenCalledTimes(1);
        });

        it("should throw an error if updating movie list fails", async () => {
            const track: ITrack = {
                spotifyId: "123",
                img: "image.jpg",
                name: "Test Track",
                artist: "Test Artist",
                href: "http://example.com",
                movies: [
                    {
                        id: "movie1",
                        name: "Movie 1",
                        plot: "Plot of Movie 1",
                        year: "2023",
                        img: "movie1.jpg",
                    },
                ],
            };

            const errorMessage = "Query failed.";
            (TrackModel.updateOne as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(trackService.updateMovieList(track)).rejects.toThrowError(errorMessage);
        });
    });
});
