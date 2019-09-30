import http from "http";

import { Log } from "../log";

export class ApiSource {
    public constructor(log: Log) {
        this.log = log;
    }

    async public fetchIpAddress(): Promise<string> {
        this.log.info("source.api.fetchIpAddress.start");

        let result: string;
        try {
            result = await httpGetJson("http://ifconfig.co");
        } catch (err) {
            this.log.warn("api.source", { message: `Error making HTTP request: ${err.toString()}`});
            throw err;
        }

        let jsonResult: string;
        try {
            jsonResult = JSON.parse(result);
        } catch (err) {
            this.log.warn("api.source", { message: `Error parsing JSON: ${err.toString()}`});
            throw err;
        }

        this.log.info("source.api.fetchIpAddress.complete");

        return jsonResult;
    }

    private httpGetJson(uri: string): Promise<string> {
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
}
