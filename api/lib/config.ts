
export const config = {
    port: process.env.PORT || 4201,
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://dbuser:HrMMV3N0YxXQMRxe@songtrack-cluster.ukdmh.mongodb.net/?retryWrites=true&w=majority&appName=songtrack-cluster',
    spotifyApiClient: process.env.SPOTIFY_CLIENT_ID,
    spotifyApiSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyApiEndpointSearch: 'https://api.spotify.com/v1/search',
    spotifyApiEndpointToken: 'https://accounts.spotify.com/api/token',
    spotifyApiSearchLimit: 10,
};