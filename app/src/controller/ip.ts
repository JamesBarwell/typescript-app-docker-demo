export default (apiRepo: any) => {
    async function ipAction(req: any, res: any, next: any) {
        try {
            const result = await apiRepo.getIpAddress();
            res.setHeader("Content-Type", "plain/text");
            res.send(`My IP is: ${result}`);
        } catch (err) {
            next(err);
        }
    }

    return {
        ipAction,
    };
};
