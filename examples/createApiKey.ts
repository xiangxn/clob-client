import { ethers } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { Chain, ClobClient } from "../src";

dotenvConfig({ path: resolve(__dirname, "../.env") });

import axios from "axios";
import { SocksProxyAgent } from "socks-proxy-agent";
const agent = new SocksProxyAgent("socks5h://127.0.0.1:1080");
axios.defaults.httpsAgent = agent;
axios.defaults.httpAgent = agent;

async function main() {
    const wallet = new ethers.Wallet(`${process.env.PK}`);
    const chainId = parseInt(`${process.env.CHAIN_ID || Chain.AMOY}`) as Chain;
    console.log(`Address: ${await wallet.getAddress()}, chainId: ${chainId}`);

    const host = process.env.CLOB_API_URL || "http://localhost:8080";
    const clobClient = new ClobClient(host, chainId, wallet);

    console.log(`Response: `);
    const resp = await clobClient.createApiKey();
    console.log(resp);
    console.log(`Complete!`);
}

main();
