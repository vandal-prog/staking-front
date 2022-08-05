import "./app.css";
import Layout from "./components/Layout/Layout";

import Web3 from "web3";
import Staking from "./BlockchainData/build/Staking.json";
import USDT from "./BlockchainData/build/IERC20.json";

function App() {
  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      try {
        window.web3 = new Web3(window.web3.currentProvider);
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert("No ETH wallet detected");
    }
  };

  // Fetch account and network ID
  loadBlockchainData = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({ account: account[0] });
    const networkId = await web3.eth.net.getId();

    // Load app contract
    const contractData = Staking.networks[networkId];
    if (contractData) {
      const staking = new web3.eth.Contract(Staking.abi, contractData.address);
      this.setState({ staking });
      let onChainBalance = await staking.methods
        .onChainBalance(this.state.account)
        .call();
      this.setState({ onChainBalance: onChainBalance / decimals });
      console.log({ Balance: onChainBalance / decimals });
    } else {
      console.log("Cannot load contract");
    }

    // Load USDT contract
    const USDTdata = USDT.networks[networkId];
    const USDTaddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    if (USDTdata) {
      const usdt = new web3.eth.Contract(USDT.abi, USDTaddress);
      this.setState({ usdt });
      let onChainBalance = await this.state.usdt.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ onChainBalance: onChainBalance / decimals });
      console.log({ Balance: onChainBalance / decimals });
    } else {
      console.log("Cannot load USDT contract");
    }
  };

  // Function to stake
  stakeFunction = async (percentage, minPrice, maxPrice) => {
    await this.state.usdt.methods
      .approve(contractAddress, this.state.onChainBalance)
      .call()
      .on("transactionHash", (hash) => {});
    await this.state.staking.methods
      .stakeTokens(percentage, minPrice, maxPrice)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ staked: true });
      });
  };

  //Function to pledge
  pledgeFunction = async (amount, percentage, duration) => {
    await this.state.staking.methods
      .pledgeTokens(amount, percentage, duration)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ pledged: true });
      });
  };

  // Function to withdraw
  withdrawFunction = async (amount, cumulativeIncome) => {
    await this.state.staking.methods
      .withdrawReward(amount, cumulativeIncome)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ staked: false, pledged: false });
      });
  };

  // variables for staking and pledging data

  // current pledge
  pledgeBalance = async () => {
    let pledgeBalance = await this.state.staking.methods
      .pledgedBalance(this.state.account)
      .call();
    this.setState({ pledgeBalance: pledgeBalance });
  };

  // total pledge made
  cumulatedPledgeBalance = async () => {
    let cumulatedPledgeBalance = await this.state.staking.methods
      .cumulatedPledgeBalance(this.state.account)
      .call();
    this.setState({ cumulatedPledgeBalance: cumulatedPledgeBalance });
  };

  // staking time
  stakingTime = async () => {
    let stakingTime = await this.state.staking.methods
      .stakingTime(this.state.account)
      .call();
    this.setState({ stakingTime: stakingTime });
  };

  // pledging time
  pledgingTime = async () => {
    let pledgingTime = await this.state.staking.methods
      .pledgingTime(this.state.account)
      .call();
    this.setState({ pledgingTime: pledgingTime });
  };

  // has staked bool
  hasStaked = async () => {
    let hasStaked = await this.state.staking.methods
      .hasStaked(this.state.address)
      .call();
    this.setState({ hasStaked: hasStaked });
  };

  // has pledged bool
  hasPledged = async () => {
    let hasPledged = await this.state.staking.methods
      .hasPledged(this.state.address)
      .call();
    this.setState({ hasPledged: hasPledged });
  };

  return <Layout />;
}

export default App;
