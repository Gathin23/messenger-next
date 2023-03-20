import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "../context/Web3Context";
import styles from './ConnectWallet.module.css'

const ConnectWallet = () => {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Listen for account changes
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);
      } else {
        setAccount(null);
        setSigner(null);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // Check for existing wallet connection on component mount
    async function checkWalletConnection() {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setSigner(signer);
      }
    }

    checkWalletConnection();

    // Remove event listener on component unmount
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
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
    <div className={styles.body}>
    <Web3Provider signer={signer} account={account}>
      <button className={styles.button} onClick={handleClick}>Connect Wallet</button>
      <p className={styles.para}>Connected to :  {account}</p>
    </Web3Provider>
    </div>
  );
};

export default ConnectWallet;
