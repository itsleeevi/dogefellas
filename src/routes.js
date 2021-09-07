import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import Pets from "./components/pets";
import "./components/home.scss";
import Home from "./components/home";
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
  return <div className="footer">©2021 DogeFellas.</div>;
};

const Routes = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return (
    <div className="app-body" style={{ paddingTop: "20px" }}>
      <TopBar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          exact
          key={1}
          path="/home"
          render={() => (
            <Home
              connect={props.connect}
              connected={props.connected}
              accounts={props.accounts}
              mintedVouchers={props.mintedVouchers}
              petsAdopted={props.petsAdopted}
              level={props.level}
              setLevel={props.setLevel}
              setLevelToNumber={props.setLevelToNumber}
              levelToNumber={props.levelToNumber}
            />
          )}
        />
        <Route
          key={2}
          exact
          path="/FAQ"
          render={() => (
            <Pets
              connect={props.connect}
              connected={props.connected}
              accounts={props.accounts}
              petsHeld={props.petsHeld}
            />
          )}
        />
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
      <div onClick={() => scrollTo("team")}>DISCORD</div>
      <div onClick={() => scrollTo("roadmap")}>TELEGRAM</div>
      <div onClick={() => history.push("/FAQ")}>TWITTER</div>
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
