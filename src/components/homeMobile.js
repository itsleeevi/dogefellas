import { useContext } from "react";
import {
  Box,
  Button,
  Select,
  Grommet,
  Image,
  ResponsiveContext,
  Grid,
  Card,
  Stack,
  CardBody,
  Text,
  Video,
} from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import "./home.scss";
import "../App.css";
import rewards from "../assets/rewards.png";
import crazy_chef from "../assets/crazy_chef.png";
import don from "../assets/Don.png";
import goomah from "../assets/the_goomah.png";
import coffeeboy from "../assets/coffeeboy.png";
import the_cleaner from "../assets/the_cleaner.png";
import roadmap1 from "../assets/dogefellas_road_map1.png";
import roadmap2 from "../assets/dogefellasroadmapnew.png";
import video from "../assets/video.mp4";
import { mintVoucher } from "./connector";
import { SocialIcon } from "react-social-icons";

const HomeMobile = (props) => {
  function Vouchers(props) {
    const size = useContext(ResponsiveContext);
    return (
      <Box pad="small">
        <Grid gap="small" columns={size !== "small" ? "small" : "100%"}>
          {props.mintedVouchers &&
            props.mintedVouchers.map((item) => (
              <Card width="large" key={item.id}>
                <Stack anchor="bottom-left">
                  <CardBody>
                    <Image fit="cover" src={item.image} a11yTitle="voucher" />
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
      <div className="home" id="home">
        <Box
          id="intro"
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
          <Grommet theme={deepMerge(grommet, customTheme)}>
            <Video
              autoPlay={true}
              loop={true}
              controls={false}
              mute={true}
              fit="cover"
            >
              <source key="video" src={video} type="video/mp4" />
              <track
                key="cc"
                label="English"
                kind="subtitles"
                srcLang="en"
                src="/assets/small-en.vtt"
                default
              />
            </Video>
          </Grommet>
        </Box>

        <Box
          id="vouchers"
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
                  round="large"
                  justify="center"
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
                  size="large"
                  color="#BF0E0D"
                  label="Mint Voucher!"
                  onClick={() =>
                    mintVoucher(props.accounts[0], props.levelToNumber)
                  }
                />
              </Box>
            </Box>
          ) : (
            <Box align="center">
              <h3 align="center">Are you tired of living like a schnook?</h3>

              <Box animation="pulse">
                <Button
                  primary
                  size="large"
                  color="#BF0E0D"
                  label={
                    <Text size="large" weight="normal" textAlign="center">
                      Connect
                    </Text>
                  }
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
              <h2 align="center">Your Vouchers</h2>
              {props.mintedVouchers > 0 ? (
                <Text textAlign="center">You don't have any vouchers yet.</Text>
              ) : (
                <Vouchers mintedVouchers={props.mintedVouchers} />
              )}
            </Box>
          </>
        )}

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
            direction="column"
            round
          >
            <Text size="medium" weight="normal" textAlign="center">
              “For us, to live any other way was nuts. To us, those goody-good
              people who worked shitty jobs for bum paychecks and took the
              subway to work every day, worried about their bills, were dead. I
              mean, they were suckers. They had no balls. If we wanted
              something, we just took it. If anyone complained twice they got
              hit so bad, believe me, they never complained again.” <br />
              <p> —Henry Hill</p>
            </Text>
            <Box justify="center">
              <Image src={coffeeboy} />
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
            direction="column"
            round
          >
            <Box alignSelf="center">
              <Text size="medium" weight="normal" textAlign="center">
                {" "}
                Get your brass-knuckles, baseball bat or switch-blade and get
                yourself a piece of the action.
                <p> Get yourself made!</p>{" "}
              </Text>
            </Box>
            <Box width="medium">
              <Image src={crazy_chef} />
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
            direction="column"
          >
            <Text size="medium" weight="normal" textAlign="center">
              <p>
                The old country “Don” (system) has become greedy, mad and drunk
                with power.{" "}
              </p>
              <p>
                They’ve forgotten who put them there and are strung-out and
                paranoid.{" "}
              </p>
            </Text>
            <Box alignSelf="end" width="medium">
              <Image src={goomah} />
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
            direction="column"
          >
            <Text size="medium" weight="normal" textAlign="center">
              <p>
                The safety we’ve been paying protection money for all these
                years is gone and now we’re being robbed and scammed from all
                sides in a rigged game.
              </p>{" "}
              It’s time for a new Boss (crypto), to “whack” them and redress the
              balance.
            </Text>
            <Box alignSelf="end" width="large">
              <Image src={don} />
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
            direction="column"
            round
          >
            <Text
              size="medium"
              weight="normal"
              textAlign="center"
              alignSelf="center"
            >
              <p>
                We will create our own financial “families” and wealth. Join the
                new financial community that takes care of its own!
              </p>
              <p>
                You scratch our back, we’ll scratch yours. Use your connections
                to get business.
              </p>
            </Text>
            <Box alignSelf="end" width="large">
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
            direction="column"
            round
          >
            <Text
              size="medium"
              weight="normal"
              textAlign="center"
              alignSelf="center"
            >
              The square markets (Google, Amazon, etc) are flooded and are their
              own racket. Keep your dough in the hands of your family and not in
              the pockets of institutions that make a mockery of your values.
            </Text>
            <Box alignSelf="end" width="large">
              <Image src={the_cleaner} />
            </Box>
          </Box>

          <Box
            id="roadmap"
            animation="zoomIn"
            border={
              ({ color: "#000000", size: "medium" },
              { color: "#ffffff", size: "medium" })
            }
            justify="center"
            background="#2D2102"
            direction="column"
            round
          >
            <Box align="center">
              <h3>Roadmap</h3>
            </Box>
            <Box alignSelf="center" width="large">
              <Image src={roadmap1} />
            </Box>
            <Box alignSelf="center" width="large">
              <Image src={roadmap2} />
            </Box>
          </Box>
        </>
      </div>
    </>
  );
};
export default HomeMobile;
