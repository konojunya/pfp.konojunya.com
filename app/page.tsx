import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants/contract";
import ABI from "../contracts/ABI.json";
import { ContractInfo } from "./internal/ContractInfo";

export interface Data {
  name: string;
  symbol: string;
  totalSupply: number;
}

async function getData(): Promise<Data> {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  const name: string = await contract.name();
  const symbol: string = await contract.symbol();
  const totalSupply: number = Number(await contract.totalSupply());

  return {
    name,
    symbol,
    totalSupply,
  };
}

export default async function Top() {
  const data = await getData();

  return <ContractInfo {...data} />;
}
