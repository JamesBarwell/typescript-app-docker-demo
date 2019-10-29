import http from 'http';
import { log } from '../log';

interface JsonResult {
    ip: string;
}

function httpGetJson(uri: string): Promise<string> {
    return new Promise((resolve, reject): void => {
        http.get(
            uri,
            {
                headers: {
                    Accept: 'application/json',
                },
            },
            res => {
                let data = '';
                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(data);
                });
            },
        ).on('error', reject);
    });
}

async function fetchIpAddress(): Promise<JsonResult> {
    log.info('source.api.fetchIpAddress.start');

    let result: string;
    try {
        result = await httpGetJson('http://ifconfig.co');
    } catch (err) {
        log.warn('api.source', { message: `Error making HTTP request: ${err.toString()}` });
        throw err;
    }

    let jsonResult: JsonResult;
    try {
        jsonResult = JSON.parse(result);
    } catch (err) {
        log.warn('api.source', { message: `Error parsing JSON: ${err.toString()}` });
        throw err;
    }

    log.info('source.api.fetchIpAddress.complete');

    return jsonResult;
}

export { fetchIpAddress };
