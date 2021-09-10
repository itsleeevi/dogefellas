import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import "./components/home.scss";
import Home from "./components/home";
import { Grommet, ResponsiveContext } from "grommet";
import { grommet } from "grommet/themes";
import HomeMobile from "./components/homeMobile";
import { deepMerge } from "grommet/utils";

const PageNotFound = () => {
  return <h1>Page Not Found</h1>;
};

const Routes = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

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
        weight: "normal",
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
      <div className="app-body" style={{ paddingTop: "20px" }}>
        <Switch>
          <Grommet
            theme={deepMerge(grommet, customTheme)}
            style={{
              backgroundColor: "#D4B580",
            }}
          >
            <ResponsiveContext.Consumer>
              {(size) =>
                size === "small" ? (
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <HomeMobile
                        connect={props.connect}
                        connected={props.connected}
                        accounts={props.accounts}
                        mintedVouchers={props.mintedVouchers}
                        level={props.level}
                        setLevel={props.setLevel}
                        setLevelToNumber={props.setLevelToNumber}
                        levelToNumber={props.levelToNumber}
                      />
                    )}
                  />
                ) : (
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Home
                        connect={props.connect}
                        connected={props.connected}
                        accounts={props.accounts}
                        mintedVouchers={props.mintedVouchers}
                        level={props.level}
                        setLevel={props.setLevel}
                        setLevelToNumber={props.setLevelToNumber}
                        levelToNumber={props.levelToNumber}
                      />
                    )}
                  />
                )
              }
            </ResponsiveContext.Consumer>
          </Grommet>
          <Route exact key={4} path="/404" component={PageNotFound} />
          <Route exact key={5} path="*" render={() => <Redirect to="/404" />} />
        </Switch>
      </div>
    </>
  );
};

export default Routes;
