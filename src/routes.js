import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Faq from "./components/faq";
import Pets from "./components/pets";
import appIco from "./assets/LogoNFT.png";
import "./components/home.scss";
import Home from "./components/home";
import appName from "./assets/SpiritOrbPetsLogoCapsx8.png";
import twitterIco from "./assets/twitter1.svg";
import discardIco from "./assets/discord1-01.svg";
import twitterIco2 from "./assets/twitter2.svg";
import discardIco2 from "./assets/discord1-02.svg";
import footerIco from "./assets/Mask Group 1.svg";
import Cloud from "./assets/Cloud.svg";
import logo from "./assets/logo-dogefellas.png";

const PageNotFound = () => {
  return <h1>Page Not Found</h1>;
};
const TopBar = () => {
  return (
    <>
      <div className="top-bar">
        <img src={logo} height="230px" alt="" />
      </div>
      <NavBar />
    </>
  );
};
const Footer = () => {
  return (
    <div className="footer">
      <img src={footerIco} alt="" />
      <div className="footer-ico">
        <img
          src={twitterIco2}
          alt=""
          onClick={() => window.open("https://www.twitter.com/SpiritOrbPets/")}
        />
        <img
          src={discardIco2}
          alt=""
          onClick={() => window.open("https://discord.gg/qvH5MdyFQv")}
        />
      </div>
    </div>
  );
};

const Routes = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return (
    <div className="app-body" style={{ paddingTop: "20px" }}>
      <div className="clouds"></div>
      <TopBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/Home" />} />
        <Route
          exact
          key={1}
          path="/Home"
          render={() => (
            <Home
              connect={props.connect}
              connected={props.connected}
              accounts={props.accounts}
              petsHeld={props.petsHeld}
              petsAdopted={props.petsAdopted}
            />
          )}
        />
        <Route key={2} exact path="/FAQ" component={Faq} />
        <Route
          exact
          key={3}
          path="/PETS"
          render={() => (
            <Pets
              connect={props.connect}
              connected={props.connected}
              accounts={props.accounts}
              petsHeld={props.petsHeld}
            />
          )}
        />
        <Route exact key={4} path="/404" component={PageNotFound} />
        <Route exact key={5} path="*" render={() => <Redirect to="/404" />} />
      </Switch>
      <Footer />
    </div>
  );
};

export default Routes;

const NavBar = ({ setpopOpened }) => {
  const history = useHistory();
  return (
    <div className="nav-bar">
      <div onClick={() => history.push("/Home")}>HOME</div>
      <div onClick={() => history.push("/PETS")}>VOUCHERS</div>
      <div onClick={() => scrollTo("team")}>TEAM</div>

      <div onClick={() => scrollTo("roadmap")}>ROADMAP</div>
      <div onClick={() => history.push("/FAQ")}>FAQ</div>
    </div>
  );
};

const scrollTo = (id) => {
  var elem = document.getElementById(id);
  elem &&
    elem.scrollIntoView({
      behavior: "smooth",
    });
};
