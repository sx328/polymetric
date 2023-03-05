import { ethers } from "ethers";

export const getAccounts = async (provider) => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

    return address;
  } catch (error) {
    return error;
  }
}

export const getBalance = async (provider) => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address = await signer.getAddress();

    // Get user's balance in ether
    const balance = ethers.utils.formatEther(
      await ethersProvider.getBalance(address) // Balance is in wei
    );

    return balance;
  } catch (error) {
    return error;
  }
}

export const getChainId = async (provider) => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    // Get the connected Chain's ID
    const networkDetails = await ethersProvider.getNetwork();

    return networkDetails.chainId;
  } catch (error) {
    return error;
  }
}