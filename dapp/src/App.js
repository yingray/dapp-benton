import "./App.css";
import { useEffect, useState } from "react";
import { getAccount, getBentonContract } from "./web3";

function App() {
  const [account, setAccount] = useState("");
  const [result, setResult] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    getAccount()
      .then((accounts) => {
        setAccount(accounts[0]);
        return getBentonContract();
      })
      .then((benton) => {
        setContract(benton);
      });
  }, []);

  useEffect(() => {
    if (!contract || !account) {
      return;
    }

    contract.methods
      .bills(account)
      .call()
      .then((bill) => {
        setResult(bill);
      });
  }, [contract, account]);

  const handleClick = () => {
    if (!contract || !account) {
      return;
    }
    contract.methods
      .order("雞排飯", 95)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        contract.methods
          .bills(account)
          .call()
          .then((bill) => {
            setResult(bill);
          });
      });
  };

  if (!account) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Account: {account}</p>
        {result && <p>{JSON.stringify(result)}</p>}
        <button onClick={handleClick}>click to order</button>
      </header>
    </div>
  );
}

export default App;
