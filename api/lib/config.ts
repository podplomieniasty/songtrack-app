
export const config = {
    port: process.env.PORT || 4201,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://dbuser:HrMMV3N0YxXQMRxe@songtrack-cluster.ukdmh.mongodb.net/?retryWrites=true&w=majority&appName=songtrack-cluster',
    jwtSecret: process.env.JWT_SECRET || 'fce345a70b4ea5a6c63c66596349543b590ee77053f3d1fd4704e880e26c9030',
    spotifyApiClient: process.env.SPOTIFY_CLIENT_ID,
    spotifyApiSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyApiEndpointSearch: 'https://api.spotify.com/v1/search',
    spotifyApiEndpointToken: 'https://accounts.spotify.com/api/token',
    spotifyApiEndpointTrack: 'https://api.spotify.com/v1/tracks',
    spotifyApiSearchLimit: 10,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    RAWG_API_KEY: process.env.RAWG_API_KEY,
    rawgApiEndpoint: 'https://api.rawg.io/api',
};