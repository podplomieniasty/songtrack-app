import IndexController from "./controllers/index.controller";
import App from "./app";
import SpotifyController from "./controllers/spotify.controller";
import TrackController from "./controllers/track.controller";
import UserController from "./controllers/user.controller";
import OMDBController from "./controllers/omdb.controller";
import RAWGController from "./controllers/rawg.controller";

const app: App = new App([
    new IndexController(),
    new SpotifyController(),
    new TrackController(),
    new UserController(),
    new OMDBController(),
    new RAWGController(),
]);

app.listen();