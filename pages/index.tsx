import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants/contract";
import ABI from "../contracts/ABI.json";
import { ContractInfo } from "../app/internal/ContractInfo";
import { GetStaticProps, NextPage } from "next";

export interface Data {
  name: string;
  symbol: string;
  totalSupply: number;
}

const Top: NextPage<Data> = (data) => {
  return <ContractInfo {...data} />;
};

export default Top;

export const getStaticProps: GetStaticProps<Data> = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  const name: string = await contract.name();
  const symbol: string = await contract.symbol();
  const totalSupply: number = Number(await contract.totalSupply());

  return {
    props: {
      name,
      symbol,
      totalSupply,
    },
  };
};
