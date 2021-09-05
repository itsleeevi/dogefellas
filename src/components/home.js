import adoptIco from "../assets/Green Box.svg";
import gifIco from "../assets/SpiritOrbPetsTeaserx8.gif";
import pinkBig from "../assets/PinkBig.png";
import darkBig from "../assets/DarkBig.png";
import homeBlock from "../assets/Release box.png";
import teamIco from "../assets/LightBig@2x.png";
import road from "../assets/Line3.svg";
import adoptBlock from "../assets/Card2.svg";
import homeBack from "../assets/Wall.svg";

import { useEffect, useState } from "react";
import { Box, Button, Select } from "grommet";
import ReactModal from "react-modal";
import "./home.scss";

import {
  state,
  mintVoucher,
  startAdoption,
  //reserveGiveawayPets,
  updatePetsAdopted,
} from "./connector";

const teamDescription = (
  <>
    This project started as a "one man team". In the future this section may
    expand depending on the needs of the project. The art, NFT generation, and
    smart contracts were written or forked by Yomic. The initial state of the
    website was built via contract work and further developed by Yomic.
  </>
);
const homeDescription = [
  <div>
    Spirit Orb Pets are <span>digital pets</span> who live inside of computer
    electronics. It's no wonder that they found their way onto the blockchain!
    They have rearranged their data to live in the form of ERC721 tokens until
    they can be adopted by you!
  </div>,
  <div>
    This is intended to be a collector set at first with the possibility to
    evolve into something interactable depending on community interaction. If
    you intend to buy and sell at a profit later, know that we make no promises
    that you will see a return on purchases or reselling on the secondary market
    as this is not intended to be an investment in the first place.
  </div>,
  <div>
    There are planned to be{" "}
    <span>7,777 v1 (version 1) pets available at launch,</span> each with unique
    base types that represent one of the 6 elements present in the{" "}
    <span>
      land of Contor, a realm of adventure for pets and companions alike.
    </span>{" "}
    Spirit Orb Pets are loosely inspired by certain digital pets of your,
    childhood so make sure to take good care of them. Maybe one day they will
    evolve into a strong fighter, a brave adventurer, or just a cute companion
    you can have a good time with!
  </div>,
];

const roadmap = [
  {
    heading: "PHASE 0",
    description: (
      <>
        In the pre-launch phase we will be focusing on marketing to build the
        follower count on Twitter and members in Discord. During this time,
        different giveaway contests will be held with the prizes being one of
        the first 50 pets (0-49).
      </>
    ),
  },
  {
    heading: "PHASE 1",
    description: (
      <>
        We will send a warning at least 24 hours before the drop so you can
        prepare yourselves for the minting process. We will be focusing on
        support and might even have a few more giveaways assuming we were
        conservative giving them away during phase 0.
        <br /> Once we sell all 10k pets, we will update the metadata. Please
        have patience with us and the technology because it can take some time
        for it to update across all platforms.
        <br /> If we do not sell out completely after a day, we will consider
        releasing the metadata for the pets that have been purchased and set up
        a mechanism to show pets as they are purchased.
      </>
    ),
  },
  {
    heading: "PHASE 2",
    description: (
      <>
        We are planning to do item airdrops based on the types of pets that you
        have that are related to future evolution plans as well as pet care
        items.
      </>
    ),
  },
  {
    heading: "THE FUTURE",
    description: (
      <>
        Have a much longer Roadmap planned, but we don't want to spoil the
        surprises as surprises keep communities invested in the future!
      </>
    ),
  },
];

const adoptItemsArr = [1, 2, 3, 4, 5];
const adoptionHasStarted = true;

const Home = (props) => {
  const [adopted, setAdopted] = useState(0);
  const [popOpened, setpopOpened] = useState(false);
  const [adoptItems, setadoptItems] = useState([...adoptItemsArr]);
  const [selected, setSelected] = useState(null);
  const [deg, setDeg] = useState(0);
  const [level, setLevel] = useState("Select Level!");

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
          mintVoucher(props.accounts[0]);
        }
      }
    }
  };
  return (
    <div className="app-home">
      <div className="home" id="home">
        <Box
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
              <Select
                options={[
                  "0.8 BNB - Rare",
                  "1 BNB - Epic ",
                  "1.2 BNB - Legendary",
                ]}
                size="large"
              />
              <Button
                primary
                size="xlarge"
                color="#BF0E0D"
                label="Mint Voucher"
                onClick={() => adoptPets()}
              />
            </Box>
          ) : (
            <Button
              primary
              size="xlarge"
              color="#BF0E0D"
              label="Connect"
              onClick={() => props.connect()}
            />
          )}
        </Box>
        <div className="adopted-value">
          <img src={pinkBig} alt="" />
          <div>
            <div>
              {props.petsAdopted !== undefined ? props.petsAdopted : "0"}/7777
            </div>
            <div>adopted pets</div>
          </div>
          <img
            src={darkBig}
            alt=""
            style={{ transform: `rotateY(${deg}deg)` }}
          />
        </div>
        <div className="description">{homeDescription}</div>
        <div className="block">
          <img src={homeBlock} alt="" />
          <div>
            <div>
              <span>Release Date</span>
              <span>TBA!</span>
            </div>
            <div>
              <span>COST PER NFT</span>
              <span>0.07 ETH</span>
            </div>
            <div>
              <span>MAX PER MINT</span>
              <span>5 AT A TIME</span>
            </div>
          </div>
        </div>
      </div>
      <div className="roadmap" id="roadmap">
        <div>ROADMAP</div>
        {roadmap.map((i, k) => (
          <div key={k} className="items">
            <div className="heading">
              <img src={road} alt="" />
              <span>{i.heading}</span>
            </div>
            <div className="description">{i.description}</div>
          </div>
        ))}
      </div>
      <div className="team" id="team">
        <div>
          <img src={teamIco} alt="" />
        </div>
        <div>
          <div>TEAM</div>
          <div className="description">{teamDescription}</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
