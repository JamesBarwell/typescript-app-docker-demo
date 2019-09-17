/* tslint:disable:object-literal-sort-keys */
export class Log {

    public info(key: string, data?: {}): void {
        this.output("info", key, data);
    }

    public warn(key: string, data?: {}): void {
        this.output("warn", key, data);
    }

    public error(key: string, data?: {}): void {
        this.output("error", key, data);
    }
    private output(level: string, key: string, data?: {}): void {
        if (!/^[a-zA-Z0-9.-]+$/.test(key)) {
            throw new Error(
                `Invalid log key, must be alphanumeric with dots and dashes: ${key}`
            );
        }

        const logline = JSON.stringify({
            time: (new Date()).toISOString(),
            level,
            key,
            ...data,
        });

        process.stdout.write(`${logline}\n`);
    }
}
