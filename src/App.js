import "./App.css";
import Routes from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { getMintedVouchers, updatePetsAdopted } from "./components/connector";
import { useEffect, useState } from "react";

function App() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [mintedVouchers, setMintedVouchers] = useState([]);
  const [petsAdopted, setPetsAdopted] = useState(0);
  const [level, setLevel] = useState("Select Level!");
  const [levelToNumber, setLevelToNumber] = useState(0); // 0 - Legendary, 1 - Epic, 2 - Rare
  //let currentAccount = null;

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const adoptedNumber = await updatePetsAdopted();
        setPetsAdopted(adoptedNumber);
      }
      if (accounts !== undefined && accounts.length > 0) {
        await getMintedVouchers(accounts[0]).then((vouchers) => {
          setMintedVouchers(vouchers);
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
      getMintedVouchers(accounts[0]).then((vouchers) => {
        setMintedVouchers(vouchers);
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

  const getImg = (id) => {
    return "../nft/dgf/im/" + id + ".png";
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Routes
            connect={connect}
            connected={connected}
            accounts={accounts}
            mintedVouchers={mintedVouchers}
            petsAdopted={petsAdopted}
            level={level}
            setLevel={setLevel}
            setLevelToNumber={setLevelToNumber}
            levelToNumber={levelToNumber}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
