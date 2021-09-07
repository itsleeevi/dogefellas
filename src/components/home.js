import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Select,
  Grommet,
  Carousel,
  Image,
  ResponsiveContext,
  Header,
  Grid,
  Card,
  Stack,
  CardBody,
  CardHeader,
  Avatar,
  Heading,
  Text,
  DataTable,
} from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import "./home.scss";
import { Attraction, Car, TreeOption } from "grommet-icons";
import rewards from "../assets/rewards.png";

import { state, mintVoucher, updatePetsAdopted } from "./connector";

const adoptItemsArr = [1, 2, 3, 4, 5];
const adoptionHasStarted = true;

const Home = (props) => {
  const [adopted, setAdopted] = useState(0);
  const [popOpened, setpopOpened] = useState(false);
  const [adoptItems, setadoptItems] = useState([...adoptItemsArr]);
  const [selected, setSelected] = useState(null);
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    if (adoptionHasStarted) {
      updatePetsAdopted();
      setAdopted(state.petsAdopted);
    }
  }, [deg, adopted]);

  const adoptPets = () => {
    if (!window.ethereum) {
      setpopOpened(true);
    } else {
      if (props.connected) {
        if (!adoptionHasStarted) {
          setpopOpened(true);
        } else {
          mintVoucher(props.accounts[0], props.levelToNumber);
        }
      }
    }
  };

  function Vouchers(props) {
    const size = useContext(ResponsiveContext);
    return (
      <Box pad="small">
        <Grid gap="small" columns={size !== "small" ? "small" : "100%"}>
          {props.mintedVouchers &&
            props.mintedVouchers.map((item) => (
              <Card width="large" key={item.id}>
                {/* Stacked CardBody and CardHeader on top of each other 
              in that order */}
                <Stack anchor="bottom-left">
                  <CardBody>
                    <Image
                      fit="cover"
                      //src={require("../nft/dgf/im/1.png").default}
                      //src={require(item.image).default}
                      src={item.image}
                      a11yTitle="voucher"
                    />
                  </CardBody>
                </Stack>
              </Card>
            ))}
        </Grid>
      </Box>
    );
  }

  const customTheme = {
    select: {
      icons: {
        color: "#BF0E0D",
      },
      background: "#FFFFFF",
      options: {
        container: {
          align: "center",
        },
      },
      font: {
        color: "#2D2102",
      },
    },
    global: {
      hover: {
        color: "#2D2102",
      },
      font: {
        family: "AlfaSlabOne-Regular",
        weight: 100,
        color: "#2D2102",
      },
      colors: {
        brand: "#D4B580",
      },
    },
  };
  return (
    <div className="app-home">
      <div className="home" id="home">
        <Box
          animation="zoomIn"
          direction="row"
          border={
            ({ color: "#000000", size: "medium" },
            { color: "#ffffff", size: "medium" })
          }
          pad="medium"
          align="center"
          justify="center"
          background="#2D2102"
          round
        >
          {props.connected ? (
            <Box direction="column" gap="small">
              <Grommet theme={deepMerge(grommet, customTheme)}>
                <Select
                  placeholder="Select Level!"
                  options={[
                    "0.8 BNB - Rare",
                    "1 BNB - Epic",
                    "1.2 BNB - Legendary",
                  ]}
                  value={props.level}
                  onChange={({ option }) => {
                    if (option === "0.8 BNB - Rare") {
                      props.setLevel("0.8 BNB - Rare");
                      props.setLevelToNumber(2);
                    }
                    if (option === "1 BNB - Epic") {
                      props.setLevel("1 BNB - Epic");
                      props.setLevelToNumber(1);
                    }
                    if (option === "1.2 BNB - Legendary") {
                      props.setLevel("1.2 BNB - Legendary");
                      props.setLevelToNumber(0);
                    }
                  }}
                  size="large"
                />
              </Grommet>
              <Box animation={{ type: "pulse", size: "medium" }}>
                <Button
                  primary
                  size="xlarge"
                  color="#BF0E0D"
                  label="Mint Voucher!"
                  onClick={() => adoptPets()}
                />
              </Box>
            </Box>
          ) : (
            <Box align="center">
              <Heading>Are you tired of living like a schnook?</Heading>
              <Box animation="pulse">
                <Button
                  primary
                  size="xlarge"
                  color="#BF0E0D"
                  label="Connect"
                  onClick={() => props.connect()}
                />
              </Box>
            </Box>
          )}
        </Box>

        {props.connected && (
          <>
            <Box
              animation="zoomIn"
              border={
                ({ color: "#000000", size: "medium" },
                { color: "#ffffff", size: "medium" })
              }
              pad="medium"
              justify="center"
              background="#2D2102"
              round
            >
              <Heading>Your Vouchers</Heading>
              <Vouchers mintedVouchers={props.mintedVouchers} />
            </Box>
          </>
        )}
        {!props.connected && (
          <>
            <Box
              animation="zoomIn"
              border={
                ({ color: "#000000", size: "medium" },
                { color: "#ffffff", size: "medium" })
              }
              pad="medium"
              justify="center"
              background="#2D2102"
              direction="row"
              round
            >
              <Text size="large" weight="normal">
                “For us, to live any other way was nuts. To us, those goody-good
                people who worked shitty jobs for bum paychecks and took the
                subway to work every day, worried about their bills, were dead.
                I mean, they were suckers. They had no balls. If we wanted
                something, we just took it. If anyone complained twice they got
                hit so bad, believe me, they never complained again.” <br />
                —Henry Hill
              </Text>
              <Box>
                <Image src={rewards} />
              </Box>
            </Box>
            <Box
              animation="zoomIn"
              border={
                ({ color: "#000000", size: "medium" },
                { color: "#ffffff", size: "medium" })
              }
              pad="medium"
              justify="center"
              background="#2D2102"
              round
            >
              {" "}
              <Text size="large" weight="normal">
                {" "}
                Get your brass-knuckles, baseball bat or switch-blade and get
                yourself a piece of the action.<p> Get yourself made!</p>{" "}
              </Text>
            </Box>
            <Box
              animation="zoomIn"
              border={
                ({ color: "#000000", size: "medium" },
                { color: "#ffffff", size: "medium" })
              }
              pad="medium"
              justify="center"
              background="#2D2102"
              round
              direction="row"
            >
              <Text size="large" weight="normal">
                <p>
                  The old country “Don” (system) has become greedy, mad and
                  drunk with power.{" "}
                </p>
                They’ve forgotten who put them there and are strung-out and
                paranoid.{" "}
                <p>
                  The safety we’ve been paying protection money for all these
                  years is gone and now we’re being robbed and scammed from all
                  sides in a rigged game.
                </p>{" "}
                It’s time for a new Boss (crypto), to “whack” them and redress
                the balance.
              </Text>
            </Box>
            <Box
              animation="zoomIn"
              border={
                ({ color: "#000000", size: "medium" },
                { color: "#ffffff", size: "medium" })
              }
              pad="medium"
              justify="center"
              background="#2D2102"
              round
            >
              <Text size="large" weight="normal">
                <p>
                  We will create our own financial “families” and wealth. Join
                  the new financial community that takes care of its own!
                </p>{" "}
                <p>
                  You scratch our back, we’ll scratch yours. Use your
                  connections to get business.
                </p>{" "}
                The square markets (Google, Amazon, etc) are flooded and are
                their own racket. Keep your dough in the hands of your family
                and not in the pockets of institutions that make a mockery of
                your values.
              </Text>
            </Box>
          </>
        )}

        <div className="description"></div>
      </div>
    </div>
  );
};
export default Home;
