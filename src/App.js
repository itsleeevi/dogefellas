import "./App.css";
import Routes from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { updatePetsHeld, updatePetsAdopted } from "./components/connector";
import { useEffect, useState } from "react";

function App() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [petsHeld, setPetsHeld] = useState([]);
  const [petsAdopted, setPetsAdopted] = useState(0);
  //let currentAccount = null;

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const adoptedNumber = await updatePetsAdopted();
        setPetsAdopted(adoptedNumber);
      }
      if (accounts !== undefined && accounts.length > 0) {
        await updatePetsHeld(accounts[0]).then((pets) => {
          setPetsHeld(pets);
        });
      }
    };
    init();
    if (accounts !== undefined && accounts.length > 0) {
      setConnected(true);
    }
  }, [accounts]);

  useEffect(() => {
    if (accounts !== undefined && accounts.length > 0) {
      setConnected(true);
      updatePetsHeld(accounts[0]).then((pets) => {
        setPetsHeld(pets);
      });
    } else {
      setConnected(false);
    }
  }, [accounts]);

  const connect = async () => {
    const accs = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccounts(accs);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Routes
            connect={connect}
            connected={connected}
            accounts={accounts}
            petsHeld={petsHeld}
            petsAdopted={petsAdopted}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
