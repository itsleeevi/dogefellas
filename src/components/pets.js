//import petImg from "../nft/sopv1/im/PetPlaceholder.png";
//import md from "../nft/sopv1/md/all-traits-final.json";

import ReactModal from "react-modal";
import { useEffect, useState } from "react";

//import { loadWeb3, state, updatePetsHeld, startAdoption } from "./connector";

//let interval = 0;
let checkedPetsHeldOnPageLoad = false;
const adoptionHasStarted = true;
//const petData = JSON.parse(md);

const Pets = (props) => {
  const [popOpened, setpopOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected) {
      showBoxes();
    }
  });

  const getPetImg = (id) => {
    return (
      <img src={require("../nft/dgf/im/" + id + ".png").default} alt="Pet" />
    );
  };

  const Box = (id) => {
    return (
      <div className="row">
        <br />
        <div className="col">ID: {id}</div>
        <div className="view-pet">{getPetImg(id)}</div>
        <br />
      </div>
    );
  };

  const renderConnectButton = () => {
    if (!props.connected) {
      return (
        <div className="connect-button-section" hidden={props.connected}>
          {adoptionHasStarted
            ? "PLEASE CONNECT YOUR WALLET TO VIEW YOUR COLLECTION."
            : "ADOPTION HAS NOT STARTED. THIS PAGE WILL BE OPEN DURING AND AFTER MINTING!"}
          <br />
          <br />
          <div
            className="connect-button"
            onClick={() => {
              props.connect();
            }}
          >
            {"CONNECT"}
          </div>
        </div>
      );
    }
  };

  const showBoxes = () => {
    console.log(props.petsHeld);
    let items = [];

    if (props.petsHeld !== undefined && props.petsHeld.length > 0) {
      const MAX_PETS_TO_SHOW_PER_PAGE = 20;

      let lastPetToShowThisPage = 0;

      if (props.petsHeld.length <= MAX_PETS_TO_SHOW_PER_PAGE) {
        lastPetToShowThisPage = props.petsHeld.length;
      } else if (props.petsHeld.length > MAX_PETS_TO_SHOW_PER_PAGE) {
        if (
          props.petsHeld.length <
          (currentPage + 1) * MAX_PETS_TO_SHOW_PER_PAGE
        ) {
          lastPetToShowThisPage = props.petsHeld.length;
        } else {
          lastPetToShowThisPage = (currentPage + 1) * MAX_PETS_TO_SHOW_PER_PAGE;
        }
      }
      let firstPetToShowThisPage = currentPage * MAX_PETS_TO_SHOW_PER_PAGE;

      //console.log(`last pet for this page: ${lastPetToShowThisPage}`);
      for (let i = firstPetToShowThisPage; i < lastPetToShowThisPage; i++) {
        //console.log(i);
        let id = `${props.petsHeld[i]}`;
        console.log(props.petsHeld[i]);
        items.push(Box(id));
      }
    }

    return items;
  };

  const showPetsOwned = () => {
    if (
      props.accounts !== undefined &&
      props.accounts.length > 0 &&
      !checkedPetsHeldOnPageLoad
    ) {
      //console.log("loading pets held first time on page load");
      checkedPetsHeldOnPageLoad = true;
    }
    if (props.petsHeld !== undefined) {
      return `PETS OWNED: ${props.petsHeld.length}`;
    } else {
      return "Loading...";
    }
  };

  const currentPageText = () => {
    return (
      <div>
        <br />
        PAGE: {currentPage + 1}
      </div>
    );
  };

  const adoptionNotStartedText = () => {
    return (
      <div>
        ADOPTION HAS NOT STARTED. THIS PAGE WILL BE OPEN DURING AND AFTER
        MINTING!
      </div>
    );
  };

  return (
    <div className="pet-section">
      <br />
      <h1>PET COLLECTION</h1>
      {props.connected && adoptionHasStarted ? showPetsOwned() : ""}
      {props.connected && adoptionHasStarted ? currentPageText() : ""}
      {props.connected && !adoptionHasStarted ? adoptionNotStartedText() : ""}
      {window.ethereum && window.ethereum.isConnected
        ? renderConnectButton()
        : "PLEASE INSTALL A WEB3 BROWSER EXTENTION LIKE METAMASK FOR FULL WEBSITE FUNCTIONALITY."}
      <div className="page-selector-buttons">
        <div
          className="page-selector"
          onClick={() => {
            setCurrentPage(0);
          }}
          hidden={!adoptionHasStarted}
        >
          {"<<"}
        </div>
        <div
          className="page-selector"
          onClick={() => {
            if (currentPage > 0) setCurrentPage(currentPage - 1);
          }}
          hidden={!adoptionHasStarted}
        >
          {"<"}
        </div>
        <div
          className="page-selector"
          onClick={() => {
            let lastPage = Math.floor(props.petsHeld.length / 20);
            if (currentPage < lastPage) setCurrentPage(currentPage + 1);
          }}
          hidden={!adoptionHasStarted}
        >
          {">"}
        </div>
        <div
          className="page-selector"
          onClick={() => {
            let lastPage = Math.floor(props.petsHeld.length / 20);
            setCurrentPage(lastPage);
          }}
          hidden={!adoptionHasStarted}
        >
          {">>"}
        </div>
      </div>
      <div className="pet-collection">
        {props.connected && adoptionHasStarted ? showBoxes() : ""}
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={popOpened}
        onRequestClose={() => {
          setpopOpened(false);
        }}
      >
        <div className="collection-popup">
          {
            "This is just a test to see how the shape of the box is when it's active."
          }
          {
            "This is just a test to see how the shape of the box is when it's active."
          }
          {
            "This is just a test to see how the shape of the box is when it's active."
          }
        </div>
      </ReactModal>
      <div>
        CONNECTED WALLET:{" "}
        {props.accounts.length > 0 ? props.accounts[0] : "NONE"}
        <br />
      </div>
    </div>
  );
};
export default Pets;
