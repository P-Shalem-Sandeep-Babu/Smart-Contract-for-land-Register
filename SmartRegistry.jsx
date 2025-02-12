import React, { useState } from 'react';
import { ethers } from 'ethers';

const LandRegistry = () => {
    const [landId, setLandId] = useState('');
    const [location, setLocation] = useState('');
    const [area, setArea] = useState('');
    const [newOwner, setNewOwner] = useState('');
    const [landDetails, setLandDetails] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [/* ABI of your contract */];

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            setContract(new ethers.Contract(contractAddress, abi, signer));
            const account = await signer.getAddress();
            setAccount(account);
        } else {
            alert('Please install MetaMask!');
        }
    };

    const registerLand = async () => {
        if (contract && account) {
            const tx = await contract.registerLand(location, area);
            await tx.wait();
            alert('Land registered successfully!');
        }
    };

    const transferOwnership = async () => {
        if (contract && account) {
            const tx = await contract.transferOwnership(landId, newOwner);
            await tx.wait();
            alert('Ownership transferred successfully!');
        }
    };

    const getLandDetails = async () => {
        if (contract && account) {
            const details = await contract.getLand(landId);
            setLandDetails(details);
        }
    };

    return (
        <div>
            <h1>Land Registry</h1>
            <button onClick={connectWallet}>Connect Wallet</button>

            <h2>Register Land</h2>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <input type="number" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} />
            <button onClick={registerLand}>Register Land</button>

            <h2>Transfer Ownership</h2>
            <input type="number" placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} />
            <input type="text" placeholder="New Owner Address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
            <button onClick={transferOwnership}>Transfer Ownership</button>

            <h2>Get Land Details</h2>
            <input type="number" placeholder="Land ID" value={landId} onChange={(e) => setLandId(e.target.value)} />
            <button onClick={getLandDetails}>Get Details</button>

            {landDetails && (
                <div>
                    <h3>Land Details</h3>
                    <p>ID: {landDetails.id.toString()}</p>
                    <p>Location: {landDetails.location}</p>
                    <p>Area: {landDetails.area.toString()}</p>
                    <p>Owner: {landDetails.owner}</p>
                    <p>Registered: {landDetails.registered ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default LandRegistry;