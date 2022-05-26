import { ethers } from 'ethers';

export * from './abi';
export * from './sales';
export * from './factory';
export * from './auctions';
export * from './bundleSales';
export * from './token';

export const getSigner = async () => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return signer;
};
