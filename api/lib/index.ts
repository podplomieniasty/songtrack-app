import IndexController from "./controllers/index.controller";
import App from "./app";
import SpotifyController from "./controllers/spotify.controller";

const app: App = new App([
    new IndexController(),
    new SpotifyController()
]);

app.listen();