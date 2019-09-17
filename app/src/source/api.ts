import http from "http";

import { Log } from "../log";

function httpGetJson(uri: string): Promise<string> {
    return new Promise((resolve, reject) => {
        http.get(uri, {
            headers: {
                Accept: "application/json",
            },
        }, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                resolve(data);
            });
        }).on("error", reject);
    });
}

export default (log: Log) => {
    async function fetchIpAddress(): Promise<string> {
        log.info("source.api.fetchIpAddress.start");

        let result: string;
        try {
            result = await httpGetJson("http://ifconfig.co");
        } catch (err) {
            log.warn("api.source", { message: `Error making HTTP request: ${err.toString()}`});
            throw err;
        }

        let jsonResult: string;
        try {
            jsonResult = JSON.parse(result);
        } catch (err) {
            log.warn("api.source", { message: `Error parsing JSON: ${err.toString()}`});
            throw err;
        }

        log.info("source.api.fetchIpAddress.complete");

        return jsonResult;
    }

    return {
        fetchIpAddress,
    };
};
