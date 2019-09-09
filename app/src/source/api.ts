import http from "http";

function httpGetJson(uri: any) {
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

export default (log: any) => {
    async function fetchIpAddress(): Promise<any> {
        log.info("source.api.fetchIpAddress.start");

        let result: any;
        try {
            result = await httpGetJson("http://ifconfig.co");
        } catch (err) {
            log.warn("Error making HTTP request:", err);
            throw err;
        }

        let jsonResult: any;
        try {
            jsonResult = JSON.parse(result);
        } catch (err) {
            log.warn("Error parsing JSON:", err);
            throw err;
        }

        log.info("source.api.fetchIpAddress.complete");

        return jsonResult;
    }

    return {
        fetchIpAddress,
    };
};
