import { app } from './app';
import { log } from './log';

const httpPort = 8080;
app.listen(httpPort, () => {
    log.info('http.listen', { port: httpPort });
});
