import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { getAccount } from "./web3";

function App() {
  const [account, setAccount] = useState("");

  useEffect(() => {
    getAccount().then((accounts) => {
      setAccount(accounts[0]);
    });
  }, []);

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>Account: {account}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
