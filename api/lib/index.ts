import IndexController from "./controllers/index.controller";
import App from "./app";
import SpotifyController from "./controllers/spotify.controller";
import TrackController from "./controllers/track.controller";
import UserController from "./controllers/user.controller";

const app: App = new App([
    new IndexController(),
    new SpotifyController(),
    new TrackController(),
    new UserController(),
]);

app.listen();