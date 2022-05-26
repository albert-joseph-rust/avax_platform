
import { calculateGasMargin, getHigherGWEI } from '../utils/index';
import useContract from '../hooks/useContract';
import { ethers } from 'ethers';

import { SALES_CONTRACT_ABI } from './abi';
import sognalbummarketplaceabi from './sognalbummarketplaceabi.json'

export const useSalesContract = () => {
  const { getContract } = useContract();
  const Contracts = {
    songAlbumMarketplace: process.env.REACT_APP_MARKETPLACE_ADDRESS //ERC721 NFT factory address : 1song = 1NFT
  };

  const getSalesContract = async () =>
    await getContract(Contracts.songAlbumMarketplace, sognalbummarketplaceabi);

  const buyItemETH = async (nftAddress, tokenId, owner, quantity, value, from) => {
    const contract = await getSalesContract();
    const args = [nftAddress, tokenId, owner, quantity];
    
    const options = {
      value,
      from,
      gasPrice: await getHigherGWEI(),
      gasLimit : 300000
    };
    console.log("Here is OK=======================================>", options)
    // const gasEstimate = await contract.estimateGas[
    //   'buyItemMain(address,uint256,address)'
    // ](...args, options);
    
    // options.gasLimit = calculateGasMargin(gasEstimate);
    return await contract['buyItemMain(address,uint256,address,uint256)'](...args, options);
  };

  const buyItemERC20 = async (nftAddress, tokenId, payToken, owner) => {
    const contract = await getSalesContract();
    const options = {
      gasPrice: await getHigherGWEI(),
    };

    return await contract['buyItem(address,uint256,address,address)'](
      nftAddress,
      tokenId,
      payToken,
      owner,
      options
    );
  };

  const cancelListing = async (nftAddress, tokenId) => {
    const contract = await getSalesContract();
    const options = {
      gasPrice: await getHigherGWEI(),
    };

    const tx = await contract.cancelListing(nftAddress, tokenId, options);
    await tx.wait();
  };

  const listItem = async (
    nftAddress,
    tokenId,
    quantity,
    payToken,
    pricePerItem,
    startingTime
  ) => {
    const contract = await getSalesContract();

    const options = {
      gasPrice: await getHigherGWEI(),
    };

    return await contract.listItem(
      nftAddress,
      tokenId,
      quantity,
      payToken,
      pricePerItem,
      startingTime,
      options
    );
  };

  const updateListing = async (
    nftAddress,
    tokenId,
    payToken,
    newPrice
    // quantity
  ) => {
    const contract = await getSalesContract();

    const options = {
      gasPrice: await getHigherGWEI(),
    };

    return await contract.updateListing(
      nftAddress,
      tokenId,
      payToken,
      newPrice,
      options
    );
  };

  const createOffer = async (
    nftAddress,
    tokenId,
    payToken,
    quantity,
    pricePerItem,
    deadline
  ) => {
    const contract = await getSalesContract();

    const options = {
      gasPrice: await getHigherGWEI(),
    };

    return await contract.createOffer(
      nftAddress,
      tokenId,
      payToken,
      quantity,
      pricePerItem,
      deadline,
      options
    );
  };

  const cancelOffer = async (nftAddress, tokenId) => {
    const contract = await getSalesContract();
    const options = {
      gasPrice: await getHigherGWEI(),
    };

    return await contract.cancelOffer(nftAddress, tokenId, options);
  };

  const acceptOffer = async (nftAddress, tokenId, creator) => {
    const contract = await getSalesContract();
    const options = {
      gasPrice: await getHigherGWEI(),
    };
    
    return await contract.acceptOffer(nftAddress, tokenId, creator, options);
  };

  const registerRoyalty = async (nftAddress, tokenId, royalty) => {
    const contract = await getSalesContract();
    const options = {
      gasPrice: await getHigherGWEI(),
      gasLimit: ethers.BigNumber.from(360000),
    };
    console.log('Royalty is ', royalty, ' and Gas Price is ', options.gasPrice,' and NFT address is ', nftAddress, ' and TokenID is ', tokenId, ' and Gas Limit is ', options.gasLimit);
    console.log('SalesContract is ', contract);
    return await contract.registerRoyalty(
      nftAddress,
      tokenId,
      royalty,
      options
    );
  };

  const getCollectionRoyalty = async nftAddress => {
    const contract = await getSalesContract();
    return await contract.collectionRoyalties(nftAddress);
  };

  return {
    getSalesContract,
    buyItemETH,
    buyItemERC20,
    cancelListing,
    listItem,
    updateListing,
    createOffer,
    cancelOffer,
    acceptOffer,
    registerRoyalty,
    getCollectionRoyalty,
  };
};
