import App from "./app";
import ApiSource from "./source/api";

import { Log } from "./log";
const log = new Log();

const apiSource = ApiSource(
    log
);
const app = App(
    log,
    apiSource,
);

const httpPort = 8080;
app.listen(httpPort, () => {
    log.info("http.listen", { port: httpPort });
});
