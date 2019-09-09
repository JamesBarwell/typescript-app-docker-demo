export default () => {
    function padStart(value: any, length: any, character: any) {
        return `${value}`.padStart(length, character);
    }

    function getTimestamp() {
        const date = new Date();
        return `${[
            date.getUTCFullYear(),
            padStart(date.getUTCMonth() + 1, 2, "0"),
            padStart(date.getUTCDate(), 2, "0"),
        ].join("-")} ${[
            padStart(date.getUTCHours(), 2, "0"),
            padStart(date.getUTCMinutes(), 2, "0"),
            padStart(date.getUTCSeconds(), 2, "0"),
        ].join(":")}.${
            padStart(date.getUTCMilliseconds(), 3, "0")}`;
    }

    function makeLogger(level: any) {
        return (key: any, data?: any) => {
            if (!/^[a-zA-Z0-9.-]+$/.test(key)) {
                throw new Error(
                    `Invalid log key, must be alphanumeric with dots and dashes: ${key}`
                );
            }

            const logline = JSON.stringify({
                key,
                level,
                time: getTimestamp(),
                ...data,
            });

            process.stdout.write(`${logline}\n`);
        };
    }

    return {
        error: makeLogger("error"),
        info: makeLogger("info"),
        warn: makeLogger("warn"),
    };
};
