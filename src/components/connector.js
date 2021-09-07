import Web3 from "web3";

import DogeFellas from "../artifacts/DogeFellas.json";

//const contractAddress = "0x3920CF47282eb9553a921C5F5B41B006cF1E2Caa";
const contractAddress = "0x1f98Ce22C20D42dF9b5770632D583fFFa668EC9D";

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
}

export async function updatePrice() {
  try {
    await updateAllInfo();
    state.price = await contract.methods.getPrice().call();
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

export async function getMintedVouchers(account) {
  try {
    console.log(await contract.methods.walletOfOwner(account).call());
    const vouchers = await contract.methods.walletOfOwner(account).call();
    let array = [];
    let level;
    for (let i = 0; i < vouchers.length; i++) {
      if (vouchers[i] <= 9) {
        level = "Legendary";
      } else if (vouchers[i] > 9 && vouchers[i] < 20) {
        level = "Epic";
      } else {
        level = "Rare";
      }
      array.push({
        id: "#" + vouchers[i],
        image: require("../nft/dgf/im/" + vouchers[i] + ".png").default,
        level: level,
      });
    }
    return array;
  } catch (error) {
    console.log(error);
  }
}

export async function mintVoucher(account, level) {
  try {
    await updateAllInfo();
    console.log("yo");
    if (level === 0) {
      const price = await contract.methods.getLegendaryPrice().call();
      await contract.methods
        .mintVoucher(1, level)
        .send({ from: account, value: price });
    }
    if (level === 1) {
      const price = await contract.methods.getEpicPrice().call();
      await contract.methods
        .mintVoucher(1, level)
        .send({ from: account, value: price });
    }
    if (level === 2) {
      const price = await contract.methods.getRarePrice().call();
      await contract.methods
        .mintVoucher(1, level)
        .send({ from: account, value: price });
    }
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
