import { createContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import ContractABI from '../contracts/Messenger.json'

const Web3Context = createContext()

const Web3Provider = ({ children, signer ,account }) => {
    const [contract, setContract] = useState(null)
    const contractAddress = '0x36D547A2038f99EF45E51d8C2cBCD83F4D204cE2'

    useEffect(() => {
        async function connectContract() {
            if (!signer) return
            try {
                const contract = new ethers.Contract(contractAddress, ContractABI.abi, signer)
                setContract(contract)
                console.log(contract)
            } catch (err) {
                console.error(err)
                alert('Error connecting to contract')
            }
        }
        
        connectContract()
    }, [signer])

    return (
        <Web3Context.Provider value={{ contract, account }}>
        {children}
        </Web3Context.Provider>
    )
}

export { Web3Context, Web3Provider };