export default (apiSource: any) => {
    async function getIpAddress(): Promise<string> {
        const data = await apiSource.fetchIpAddress();
        return data.ip;
    }

    return {
        getIpAddress,
    };
};
