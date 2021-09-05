import Web3 from "web3";

import DogeFellas from "../artifacts/DogeFellas.json";

//const contractAddress = "0x3920CF47282eb9553a921C5F5B41B006cF1E2Caa";
const contractAddress = "0xBe9aA783395bEd56B1E33115141F485E35213c53";

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(DogeFellas.abi, contractAddress);

export var state = {
  //accounts: [],
  price: 0,
  balanceOf: 0,
  //petsHeld: [],
  //petsAdopted: 0,
};

export async function loadWeb3() {
  try {
    return await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });

    //state.accounts = await window.ethereum.request({
    //  method: "eth_accounts",
    //});
  } catch (error) {
    console.log(error);
  }
}

async function updateAllInfo() {
  if (window.contract === undefined) {
    window.contract = await loadContract();
  }
  //await loadWeb3();
}

export async function updatePrice() {
  try {
    await updateAllInfo();
    state.price = await contract.methods.getPrice().call();
    // console.log(`Price is ${state.price}.`);
    // console.log(`PriceInEth is ${state.priceInEth}.`);
  } catch (error) {
    console.log(error);
  }
}

async function getPrice() {
  await updatePrice();
  return state.price;
}

export async function updatePetsAdopted() {
  try {
    if (window.contract === undefined) {
      window.contract = await loadContract();
    }
    return await contract.methods.totalSupply().call();
  } catch (error) {
    console.log(error);
  }
}

async function loadContract() {
  try {
    if (window.ethereum.eth === undefined) {
      //await loadWeb3();
    } else {
      return await new web3.eth.Contract(DogeFellas.abi, contractAddress);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateTokensOfOwner() {
  try {
    await updateAllInfo();

    state.petsHeld = await contract.methods
      .tokensOfOwner(state.accounts[0])
      .call();
  } catch (error) {
    console.log(error);
  }
}

export async function getTokensOfOwner() {
  updateTokensOfOwner();
  return state.petsHeld;
}

export async function updatePetsHeld(account) {
  try {
    //await updateAllInfo();

    return await contract.methods.tokensOfOwner(account).call();
  } catch (error) {
    console.log(error);
  }
}

export async function mintVoucher(account) {
  try {
    await updateAllInfo();
    console.log("yo");
    await contract.methods
      .mintVoucher()
      .send({ from: account, value: await getPrice() });
  } catch (error) {
    console.log(error);
  }
}

export async function startAdoption(account) {
  try {
    await updateAllInfo();

    await contract.methods.setPause(false).send({ from: account });
  } catch (error) {
    console.log(error);
  }
}

export async function reserveGiveawayPets() {
  try {
    await updateAllInfo();

    await contract.methods.reserveGiveaway().send({ from: state.accounts[0] });
  } catch (error) {
    console.log(error);
  }
}
