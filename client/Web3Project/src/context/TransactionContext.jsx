import React , { useEffect , useState } from "react";

import { ethers } from 'ethers';
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
// metmask k liye hai ye 
console.log("Ethereum object:", ethereum);

// function to fetch the ethereum contract

const getEthereumContract = () => {

    const { ethereum } = window; 
   
    const provider = new ethers.providers.Web3Provider(ethereum);
    
    const signer = provider.getSigner();
   
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionContract;
}




export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '' , message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount')); // storing the transaction count in local storage

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    } // function to change the form data

    const checkIfWalletIsConnected = async () => {
        
        try{
            const { ethereum } = window; 
            if(!ethereum) return alert ("Please install metamask");
        const accounts = await ethereum.request({method: 'eth_accounts'});

        if(accounts.length){
            setCurrentAccount(accounts[0]);
            //getAllTransactions();
        } else{
            console.log("No accounts found");
        }
        } catch (error) {
            console.log(error)
        };
    
    };


    const connectWallet = async () => {
        try{
            const { ethereum } = window; 
            if(!ethereum) return alert("please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]); // will connect the first account
        } catch(error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }


    const sendTransaction = async () => {
        
        try{
            const { ethereum } = window; 
            if(!ethereum) return alert("please install metamsask");
            // get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            // send some eth as a transaction

            await ethereum.request({
                method: 'eth_sendTransaction',
                params : [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });

            // store the transaction to the blockchain
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount , message , keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber()); // here toNumber is used to convert BigNumber to number 
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    
    return(
        <TransactionContext.Provider value={{connectWallet , currentAccount , formData , setFormData , handleChange ,  sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    );
}