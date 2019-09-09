export default (apiSource: any) => {
    async function getIpAddress() {
        const data = await apiSource.fetchIpAddress();
        return data.ip;
    }

    return {
        getIpAddress,
    };
};
