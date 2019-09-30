import { fetchIpAddress } from "../source/api";

async function getIpAddress(): Promise<string> {
    const data = await fetchIpAddress();
    return data.ip;
};

export { getIpAddress };
