import { useState } from "react";
import Brick from "../assets/Brick red.svg";

import Arrow from "../assets/Path 112.svg";

const faqData = [
  {
    question: "What are Spirit Orb Pets?",
    answer:
      "Spirit Orb Pets are digital pets that reside in the digital space. Recently there has been an outbreak of them on the blockchain. It would be a bad idea to let them roam around it by themselves, so adopt one today!",
  },
  {
    question: "But what are they in a technical sense?",
    answer:
      "They are ERC721 tokens minted on the Ethereum blockchain to be traded, auctioned, and sold like digital trading cards that represent digital pets, each with randomized traits, personalities, preferences, etc!",
  },
  {
    question: "What is an NFT or ERC721 token?",
    answer:
      "An 'NFT' is a securely guaranteed ownership of a digital item that you can do whatever you want with including trading, buying, selling, or even interacting with various applications built for them.  Basically, when you mint or buy a pet, it's yours and you can prove that you own it, guaranteed by blockchain technology!  ERC721 (and other technical name) are just the standard that describes how they were build.",
  },
  {
    question: "What utility will they provide?",
    answer:
      "At first it will be aesthetic, but the roadmap provides some direction of where I would like to take it including items drops, v2 and v3 evolutions, and maybe even a digital pet game!  You can also get special roles in our discord depending on how many you own.",
  },
  {
    question: "How much will they sell for?",
    answer:
      "The minting price will be for 0.07ETH each.",
  },
  {
    question: "How much will they be worth in the future?",
    answer:
      "I can't make any promises for future price speculation.  It is up to the market and community to determine the value for themselves.",
  },
  {
    question: "Where can I read the Smart Contract?",
    answer:
      "When the Smart Contract is available it will be posted here and in the discord.",
  },
  {
    question: "If the minting process is done already, where can I buy them?",
    answer:
      "OpenSea will be the primary secondary market for buying and selling pets.",
  },
  {
    question: "Have you made any other games in the past?",
    answer:
      "Yes, you can check out When It Hits the Fan and Alphaman on Steam and itch.io!  You can check out those games and more on the Heartfelt Games LLC website:  http://www.heartfeltgames.org",
  },
];

const Faq = () => {
  const [faq, setFaq] = useState([...faqData]);

  const setOpen = (k) => {
    let dummy = faq;
    dummy[k].opened = !dummy[k].opened;
    setFaq([...dummy]);
  };
  return (
    <div style={{ margin: "50px 10px" }}>
      <div className="bricks">
        <img src={Brick} alt="" />
        <img src={Brick} alt="" />
        <img src={Brick} alt="" />
        <img src={Brick} alt="" />
      </div>

      <div className="modal-view">
        <div></div>
        <div>
          <div>FAQ</div>
          {faq.map((i, k) => (
            <div key={k}>
              <div onClick={() => setOpen(k)} className="question">
                <span>{i.question}</span>
                <img
                  src={Arrow}
                  alt=""
                  style={{
                    transform: i.opened ? "rotate(90deg)" : "initial",
                  }}
                />
              </div>
              {i.opened && <div className="answer">{i.answer}</div>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
export default Faq;
