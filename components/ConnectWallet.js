import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "../context/Web3Context";

const ConnectWallet = () => {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  // Check for an existing metamask connection on mount
  useEffect(() => {
    async function checkMetamaskConnection() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({method: "eth_accounts",});
          if (accounts.length > 0) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            setSigner(signer);
          }
        } catch (error) {
          return;
        }
      } else {
        return;
      }
    }
    checkMetamaskConnection();
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);
      } catch (error) {
        console.error(error);
        alert("Error connecting to MetaMask");
      }
    } else {
      alert("Please install MetaMask to use this application");
    }
  }

  async function handleClick() {
    try {
      await connectWallet();
    } catch (err) {
      console.error(err);
      alert("Error connecting to wallet");
    }
  }

  return (
    <Web3Provider signer={signer} account={account}>
      <button onClick={handleClick}>Connect Wallet</button>
      <p>Connected to {account}</p>
    </Web3Provider>
  );
};

export default ConnectWallet;
