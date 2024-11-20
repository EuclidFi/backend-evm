const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors"); 
const cron = require("node-cron");

require("dotenv").config();

// Load environment variables
// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROVIDER_URL = process.env.PROVIDER_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(PROVIDER_URL); // Correct provider instantiation for v6
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract ABI
const CONTRACT_ABI = [
    "function mint(address recipient, uint256 amount) public",
];
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

console.log("PROVIDER_URL:", process.env.PROVIDER_URL);

// Addresses to mint tokens for
const addresses = [
    "0x8FDa7EaEaBAE268E83c97Ae582DD1b93eB1C7308", // Replace with actual wallet addresses
    "0x8FDa7EaEaBAE268E83c97Ae582DD1b93eB1C7308",
];


const app = express();
app.use(express.json());
app.use(cors()); 

app.post("/mint-token", async (req, res) => {
    const { userAddress, swapAmount } = req.body;

    if (!userAddress || !swapAmount) {
        return res.status(400).json({ success: false, error: "Missing required parameters." });
    }

    try {
        console.log(`Minting tokens for ${userAddress}...`);
        const amountToMint = ethers.parseUnits(swapAmount.toString(), 18); // Convert swapAmount to tokens with 18 decimals
        const tx = await contract.mint(userAddress, amountToMint);
        await tx.wait();

        console.log(`Minted tokens for ${userAddress}: Transaction Hash: ${tx.hash}`);
        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error(`Error minting tokens for ${userAddress}:`, error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});


// Cron job: Runs every 5 minutes
cron.schedule("*/5 * * * *", async () => {
    console.log("Running mint cron job...");
    for (const address of addresses) {
        try {
            console.log(`Minting tokens for ${address}...`);
            const amountToMint = ethers.parseUnits("1", 18);
            const tx = await contract.mint(address, amountToMint); // Mint 1 token
            await tx.wait();
            console.log(`Minted tokens for ${address}: Transaction Hash: ${tx.hash}`);
        } catch (error) {
            console.error(`Failed to mint for ${address}:`, error.message);
        }
    }
});

console.log("Cron job is running. Tokens will be minted automatically.");
