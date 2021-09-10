import "./App.css";
import Routes from "./routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { getMintedVouchers } from "./components/connector";
import { useEffect, useState } from "react";
import { Box, Text, Footer, Header, Anchor, Image } from "grommet";
import { SocialIcon } from "react-social-icons";
import { Grommet, ResponsiveContext } from "grommet";
import { grommet } from "grommet/themes";
import logo from "./assets/logo-dogefellas.png";
import logoMobile from "./assets/logo.png";
import { deepMerge } from "grommet/utils";
import { Menu } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";

const scrollTo = (id) => {
  var elem = document.getElementById(id);
  elem &&
    elem.scrollIntoView({
      behavior: "smooth",
    });
};

function App() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [mintedVouchers, setMintedVouchers] = useState([]);
  const [level, setLevel] = useState("Select Level!");
  const [levelToNumber, setLevelToNumber] = useState(0); // 0 - Legendary, 1 - Epic, 2 - Rare

  useEffect(() => {
    const init = async () => {
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

  const NavBar = () => {
    return (
      <div className="nav-bar">
        <div onClick={() => scrollTo("intro")}>INTRO</div>
        <div onClick={() => scrollTo("vouchers")}>VOUCHERS</div>
        <div onClick={() => scrollTo("roadmap")}>ROADMAP</div>
        <div onClick={() => scrollTo("team")}>FAQ</div>
      </div>
    );
  };

  const customTheme = {
    select: {
      icons: {
        color: "#BF0E0D",
      },
      background: "#FFFFFF",
      options: {
        container: {
          align: "start",
        },
      },
    },

    global: {
      placeholder: {
        align: "center",
      },
      hover: {
        color: "#2D2102",
      },
      colors: {
        brand: "#BF0E0D",
        active: "#2D2102",
        border: {
          light: "#2D2102",
          dark: "#2D2102",
        },
        control: {
          light: "#2D2102",
          dark: "#2D2102",
        },
        focus: "#BF0E0D",
        placeholder: "#2D2102",
      },
      font: {
        color: "#2D2102",
        family: "Alfa Slab One",
      },
      focus: {
        background: {
          color: "#2D2102",
        },
      },
    },
    video: {
      scrubber: {
        color: "#BF0E0D",
      },
      captions: { background: "#BF0E0D" },
    },
  };

  return (
    <>
      <Grommet
        theme={deepMerge(grommet, customTheme)}
        style={{
          backgroundColor: "#D4B580",
        }}
      >
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <Header background="#2D2102" pad="medium" height="xsmall">
                <Box justify="center">
                  <Anchor
                    href="http://www.dogefellas.io/"
                    icon={
                      <Box width="150px" heigth="150px">
                        <Image src={logoMobile} />
                      </Box>
                    }
                  />
                </Box>
                <Box justify="end">
                  <Menu
                    dropBackground="#2D2102"
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: "bottom", right: "right" } }}
                    icon={<MenuIcon color="brand" />}
                    items={[
                      {
                        label: <Box pad="small">Twitter</Box>,
                        href: "https://twitter.com/dogefellasbsc",
                      },
                      {
                        label: <Box pad="small">Discord</Box>,
                        href: "https://twitter.com/dogefellasbsc",
                      },
                      {
                        label: <Box pad="small">Telegram</Box>,
                        href: "https://t.me/DogeFellas",
                      },
                      {
                        label: <Box pad="small">Medium</Box>,
                        href: "https://medium.com/@dogefellasbsc",
                      },
                    ]}
                  />
                </Box>
              </Header>
            ) : (
              <>
                <Box
                  className="top-header"
                  background="#2D2102"
                  direction="row"
                  justify="between"
                >
                  <Box align="start" alignSelf="center">
                    The official home of Dogefellas.
                  </Box>
                  <Box direction="row">
                    <Box margin="5px" width="20px" height="20px">
                      <SocialIcon
                        network="twitter"
                        url="https://twitter.com/dogefellasbsc"
                        bgColor="#F8F8F8"
                      />
                    </Box>
                    <Box margin="5px" width="20px" height="20px">
                      <SocialIcon
                        network="discord"
                        url="https://twitter.com/dogefellasbsc"
                        bgColor="#F8F8F8"
                      />
                    </Box>
                    <Box margin="5px" width="20px" height="20px">
                      <SocialIcon
                        network="telegram"
                        url="https://t.me/DogeFellas"
                        bgColor="#F8F8F8"
                      />
                    </Box>
                    <Box margin="5px" width="20px" height="20px">
                      <SocialIcon
                        network="medium"
                        url="https://medium.com/@dogefellasbsc"
                        bgColor="#F8F8F8"
                      />
                    </Box>
                  </Box>
                </Box>
                <div className="top-bar" align="center">
                  <img
                    src={logo}
                    height="250px"
                    width="300px"
                    alt="Dogefellas"
                  />
                </div>
                <NavBar />
              </>
            )
          }
        </ResponsiveContext.Consumer>
      </Grommet>

      <Router>
        <Switch>
          <Routes
            connect={connect}
            connected={connected}
            accounts={accounts}
            mintedVouchers={mintedVouchers}
            level={level}
            setLevel={setLevel}
            setLevelToNumber={setLevelToNumber}
            levelToNumber={levelToNumber}
          />
        </Switch>
      </Router>
      <Footer
        background="#2D2102"
        justify="center"
        pad="small"
        direction="column"
        gap="xsmall"
      >
        <Box direction="row">
          <Box margin="5px" width="20px" height="20px">
            <SocialIcon
              network="twitter"
              url="https://twitter.com/dogefellasbsc"
              bgColor="#BF0E0D"
            />
          </Box>
          <Box margin="5px" width="20px" height="20px">
            <SocialIcon
              network="discord"
              url="https://twitter.com/dogefellasbsc"
              bgColor="#BF0E0D"
            />
          </Box>
          <Box margin="5px" width="20px" height="20px">
            <SocialIcon
              network="telegram"
              url="https://t.me/DogeFellas"
              bgColor="#BF0E0D"
            />
          </Box>
          <Box margin="5px" width="20px" height="20px">
            <SocialIcon
              network="medium"
              url="https://medium.com/@dogefellasbsc"
              bgColor="#BF0E0D"
            />
          </Box>
        </Box>
        <Text textAlign="center" size="small">
          The official NFT voucher made by the $Fellas in the pursuit of
          financial independence.
        </Text>
        <Box align="start" alignSelf="center">
          <Text size="small" textAlign="center">
            © 2021 Copyright Dogefellas
          </Text>
        </Box>
      </Footer>
    </>
  );
}

export default App;
