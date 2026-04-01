import { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

const abi = [
    "function logAction(string _message)"
];

function App() {
  const [message, setMessage] = useState("");

  async function sendTransaction() {
    if (!window.ethereum) return alert("Install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.logAction(message);
    await tx.wait();

    alert("Transaction sent!");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Web3 Event Logger</h2>

      <input
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendTransaction}>
        Send to Blockchain
      </button>
    </div>
  );
}

export default App;