import "./app.css";
import Layout from "./components/Layout/Layout";

import Web3 from "web3";
import Staking from "./BlockchainData/build/Staking.json";
import USDT from "./BlockchainData/build/IERC20.json";
import { ethers } from "ethers";
import { connect } from "react-redux";

import React from "react";
import {
  setCurrentAccount,
  setStakingContract,
  setUSDTContract,
  setOnChainBalance,
  hasPledged,
  hasStaked,
  setCumulatedPledgeBalance,
  setCumulatedPledgeIncome,
  setPledgedBalance,
  setPledgedIncome,
  setHourlyIncome,
  setAccountBalance,
  setTodayIncome,
  setCumulativeIncome,
  setRate,
} from "./redux/user/user.actions";

class App extends React.Component {
  // use a lifecycle method to run the loadBlockchainData function once page render
  // UNSAFE_componentWillMount = async () => {
  //   await this.loadWeb3();
  //   await this.loadBlockchainData();
  //   await this.pledgeBalance();
  //   await this.cumulatedPledgeBalance();
  //   await this.pledgingTime();
  //   await this.hasPledged();
  //   await this.pledgeIncome();
  //   await this.cumulatedPledgeIncome();
  //   await this.hasStaked();
  //   await this.stakingTime();
  //   await this.hourlyIncome();
  //   await this.teamSize();
  //   await this.referralIncome();
  //   await this.firstPopulationCount();
  //   await this.secondPopulationCount();
  //   await this.thirdPopulationCount();
  //   await this.firstPopulationIncome();
  //   await this.secondPopulationIncome();
  //   await this.thirdPopulationIncome();
  // };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     account: "",
  //     staking: {},
  //     onChainBalance: "",
  //     usdt: {},
  //     decimals: 1000000,
  //     staked: false,
  //     pledged: false,
  //     pledgeBalance: "",
  //     pledgeIncome: "",
  //     cumulatedPledgeBalance: "",
  //     cumulatedPledgeIncome: "",
  //     pledgingTime: "",
  //     stakingTime: "",
  //     hourlyIncome: "",
  //     teamSize: "",
  //     firstPopulationCount: "",
  //     secondPopulationCount: "",
  //     thirdPopulationCount: "",
  //     referralIncome: "",
  //     firstPopulationIncome: "",
  //     secondPopulationIncome: "",
  //     thirdPopulationIncome: "",
  //   };
  // }

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

    console.log(web3, "wen");

    this.setState({ account: account[0] });
    const networkId = await web3.eth.net.getId();

    // Load app contract
    // const contractData = Staking.networks[networkId];
    const contractAddress = "0xbF3aF2FA79ba903aCd7108D0A629B8CC9e33F4f8";
    const staking = await new web3.eth.Contract(Staking.abi, contractAddress);
    this.setState({ staking });

    // Load USDT contract
    const USDTdata = USDT.networks[networkId];
    const USDTaddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const usdt = await new web3.eth.Contract(USDT.abi, USDTaddress);
    this.setState({ usdt });
    let onChainBalance = await this.state.usdt.methods
      .balanceOf(this.state.account)
      .call();
    this.setState({ onChainBalance: onChainBalance / this.state.decimals });
    console.log({ Balance: onChainBalance / this.state.decimals });
  };

  // Function to stake
  stakeFunction = async (minPrice, maxPrice, percentage) => {
    const contractAddress = "0xbF3aF2FA79ba903aCd7108D0A629B8CC9e33F4f8";
    await this.state.usdt.methods
      .approve(contractAddress, this.state.onChainBalance * this.state.decimals)
      .call()
      .on("transactionHash", (hash) => {});
    await this.state.staking.methods
      .stakeTokens(
        minPrice * this.state.decimals,
        maxPrice * this.state.decimals,
        percentage * 100
      )
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ staked: true });
      });
  };

  //Function to pledge
  pledgeFunction = async (amount, duration, percentage, referrer) => {
    await this.state.staking.methods
      .pledgeTokens(
        amount * this.state.decimals,
        duration,
        percentage * 100,
        referrer
      )
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ pledged: true });
      });
  };

  // Function to withdraw
  withdrawFunction = async (amount) => {
    await this.state.staking.methods
      .withdrawReward(amount * this.state.decimals)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ staked: false, pledged: false });
      });
  };

  // fetching staking, pledging and referral data

  // current pledge amount
  pledgeBalance = async () => {
    let pledgeBalance = await this.state.staking.methods
      .pledgedBalance(this.state.account)
      .call();
    this.setState({ pledgeBalance: pledgeBalance / this.state.decimals });
  };

  // total pledge made amount
  cumulatedPledgeBalance = async () => {
    let cumulatedPledgeBalance = await this.state.staking.methods
      .cumulatedPledgeBalance(this.state.account)
      .call();
    this.setState({
      cumulatedPledgeBalance: cumulatedPledgeBalance / this.state.decimals,
    });
  };

  // pledging time
  pledgingTime = async () => {
    let pledgingTime = await this.state.staking.methods
      .pledgingTime(this.state.account)
      .call();
    this.setState({ pledgingTime: pledgingTime });
  };

  // has pledged bool
  hasPledged = async () => {
    let hasPledged = await this.state.staking.methods
      .hasPledged(this.state.address)
      .call();
    this.setState({ pledged: hasPledged });
  };

  // current pledge income
  pledgeIncome = async () => {
    let pledgeIncome = await this.state.staking.methods
      .pledgeIncome(this.state.account)
      .call();
    this.setState({ pledgeIncome: pledgeIncome / this.state.decimals });
  };

  // cumulated pledge income
  cumulatedPledgeIncome = async () => {
    let cumulatedPledgeIncome = await this.state.staking.methods
      .cumulatedPledgeIncome(this.state.account)
      .call();
    this.setState({
      cumulatedPledgeIncome: cumulatedPledgeIncome / this.state.decimals,
    });
  };

  // has staked bool
  hasStaked = async () => {
    let hasStaked = await this.state.staking.methods
      .hasStaked(this.state.address)
      .call();
    this.setState({ staked: hasStaked });
  };

  // staking time
  stakingTime = async () => {
    let stakingTime = await this.state.staking.methods
      .stakingTime(this.state.account)
      .call();
    this.setState({ stakingTime: stakingTime });
  };

  // hourly staking income
  hourlyIncome = async () => {
    let hourlyIncome = this.state.staking.methods
      .hourlyIncome(this.state.account)
      .call();
    this.setState({ hourlyIncome: hourlyIncome / this.state.decimals });
  };

  // referral team size
  teamSize = async () => {
    let teamSize = this.state.staking.methods
      .teamSize(this.state.account)
      .call();
    this.setState({ teamSize: teamSize });
  };

  // total referral income
  referralIncome = async () => {
    let referralIncome = this.state.staking.methods
      .referralIncome(this.state.account)
      .call();
    this.setState({ referralIncome: referralIncome / this.state.decimals });
  };

  // first population referral count
  firstPopulationCount = async () => {
    let firstPopulationCount = this.state.staking.methods
      .firstGenerationReferral(this.state.account)
      .call();
    this.setState({ firstPopulationCount: firstPopulationCount });
  };

  // second population referral count
  secondPopulationCount = async () => {
    let secondPopulationCount = this.state.staking.methods
      .secondGenerationReferral(this.state.account)
      .call();
    this.setState({ secondPopulationCount: secondPopulationCount });
  };

  // third population referral count
  thirdPopulationCount = async () => {
    let thirdPopulationCount = this.state.staking.methods
      .thirdGenerationReferral(this.state.account)
      .call();
    this.setState({ thirdPopulationCount: thirdPopulationCount });
  };

  // first population referral income
  firstPopulationIncome = async () => {
    let firstPopulationIncome = this.state.staking.methods
      .firstGenerationIncome(this.state.account)
      .call();
    this.setState({
      firstPopulationIncome: firstPopulationIncome / this.state.decimals,
    });
  };

  // second population referral income
  secondPopulationIncome = async () => {
    let secondPopulationIncome = this.state.staking.methods
      .secondGenerationIncome(this.state.account)
      .call();
    this.setState({
      secondPopulationIncome: secondPopulationIncome / this.state.decimals,
    });
  };

  // third population referral income
  thirdPopulationIncome = async () => {
    let thirdPopulationIncome = this.state.staking.methods
      .thirdGenerationIncome(this.state.account)
      .call();
    this.setState({
      thirdPopulationIncome: thirdPopulationIncome / this.state.decimals,
    });
  };

  // UNSAFE_componentWillMount = async () => {
  //   const {
  //     setCurrentAccount,
  //     setStakingContract,
  //     setUSDTContract,
  //     setOnChainBalance,
  //     hasStaked,
  //     hasPledged,
  //     setPledgeBalance,
  //     setPledgeIncome,
  //     setCumulatedPledgeIncome,
  //     setCumulatedPledgeBalance,
  //     setHourlyIncome,
  //   } = this.props;
  //   const { ethereum } = window;

  //   try {
  //     //if no wallet is found in browser it returns this
  //     if (!ethereum) return alert("Please install metamask");

  //     const accounts = await ethereum.request({
  //       method: "eth_accounts",
  //     });

  //     console.log(accounts);

  //     if (accounts.length) {
  //       //getAllTransactions();
  //       setCurrentAccount(accounts[0]);
  //       setOnChainBalance();
  //       hasStaked();
  //       hasPledged();
  //       setPledgeIncome();
  //       setPledgeBalance();
  //       setCumulatedPledgeIncome();
  //       setCumulatedPledgeBalance();
  //       setHourlyIncome();
  //     } else {
  //       console.log("No accounts found");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object.");
  //   }
  // };

  componentDidMount() {
    const {
      setCurrentAccount,
      setStakingContract,
      setUSDTContract,
      setOnChainBalance,
      hasStaked,
      hasPledged,
      setPledgeBalance,
      setPledgeIncome,
      setCumulatedPledgeIncome,
      setCumulatedPledgeBalance,
      setHourlyIncome,
      hourlyIncome,
      setAccountBalance,
      setTodayIncome,
      setCumulativeIncome,
      setRate,
    } = this.props;
    const { ethereum } = window;

    // const contractAddress = "0xfF79f9C507ebA207a02C6c7ce6d13f30DF09d9d2";
    // const USDTaddress = "0xFab46E002BbF0b4509813474841E0716E6730136";

    const contractAddress = "0x904e0C7d2f399f20139B9AFdD77732D58951F844";
    const USDTaddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

    if (!window.ethereum) {
      alert("Please, install ETH wallet and reload this page");
    }
    if (ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    
    const provider = new ethers.providers.JsonRpcProvider(
      'https:/ropsten.infura.io/v3/f1090728525d468ba7c5aee73d230b3f'
      )
    
    const getStakingContract = () => {
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(
        contractAddress,
        Staking.abi,
        signer
      );

      return transactionContract;
    };

    const getUSDTContract = () => {
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(
        USDTaddress,
        USDT.abi,
        signer
      );

      return transactionContract;
    };

    const checkIfWalletIsConnected = async () => {
      try {
        //if no wallet is found in browser it returns this
        if (!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length) {
          //getAllTransactions();
          setCurrentAccount(accounts[0]);
          setOnChainBalance();
          hasPledged();
          setPledgeIncome();
          setPledgeBalance();
          setCumulatedPledgeIncome();
          setCumulatedPledgeBalance();
          setHourlyIncome();
          // console.log(accounts)
          hasStaked();
          // setRate();
          // setPledgeIncome();
          // setPledgeBalance();
          // setCumulatedPledgeIncome();
          // setCumulatedPledgeBalance();
          // await setHourlyIncome();
          // setAccountBalance(hourlyIncome);
          // setTodayIncome(hourlyIncome);
          // setCumulativeIncome(hourlyIncome);
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);

        throw new Error("No ethereum object.");
      }
    };

    const stakingContract = getStakingContract();
    const usdtContract = getUSDTContract();
    setStakingContract(stakingContract);
    setUSDTContract(usdtContract);
    checkIfWalletIsConnected();
    // hasStaked();
    // hasPledged();
  }

  render() {
    return (
      // <BlockchainState>
      <Layout />
      // </BlockchainState>
    );
  }
}

const mapStateToProps = (state) => ({
  hourlyIncome: state.data.hourlyIncome,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentAccount: (account) => dispatch(setCurrentAccount(account)),
  setStakingContract: (contract) => dispatch(setStakingContract(contract)),
  setUSDTContract: (contract) => dispatch(setUSDTContract(contract)),
  setOnChainBalance: () => dispatch(setOnChainBalance()),
  hasStaked: () => dispatch(hasStaked()),
  hasPledged: () => dispatch(hasPledged()),
  setPledgeIncome: () => dispatch(setPledgedIncome()),
  setPledgeBalance: () => dispatch(setPledgedBalance()),
  setCumulatedPledgeIncome: () => dispatch(setCumulatedPledgeIncome()),
  setCumulatedPledgeBalance: () => dispatch(setCumulatedPledgeBalance()),
  setHourlyIncome: () => dispatch(setHourlyIncome()),
  setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
  setTodayIncome: (hourlyIncome) => dispatch(setTodayIncome(hourlyIncome)),
  setCumulativeIncome: (hourlyIncome) =>
    dispatch(setCumulativeIncome(hourlyIncome)),
  setRate: (percent) => dispatch(setRate(percent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
