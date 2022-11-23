import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ethers } from "ethers";

import Staking from "../../BlockchainData/build/Staking.json";

import USDT from "../../BlockchainData/build/IERC20.json";

import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import "./header.css";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { shortenAddress } from "../../utils/shortenAddress";
import TawkTo from "tawkto-react";

import {
  setCurrentAccount,
  setOnChainBalance,
  hasStaked,
  hasPledged,
  setCumulatedPledgeBalance,
  setCumulatedPledgeIncome,
  setHourlyIncome,
  setPledgedBalance,
  setPledgedIncome,
  setAccountBalance,
  setTodayIncome,
  setCumulativeIncome,
  logout,
} from "../../redux/user/user.actions";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/home",
  },
  {
    display: "NftMarket",
    url: "/market",
  },
  {
    display: "Invitefriends",
    url: "/create",
  },

  {
    display: "Account",
    url: "/account",
  },
  {
    display: "FAQ",
    url: "/home",
  },
];

const Header = ({
  currentAccount,
  setCurrentAccount,
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
  setCumulativeIncome,
  setTodayIncome,
  logout,
}) => {
  // const { currentAccount, connectWallet, setOnChainBalance } =
  //   useContext(TransactionContext);

  const { ethereum } = window;

  const [toggleMenu, setToggleMenu] = useState(false);

  const connectWallet = async () => {
    // const provider = new ethers.providers.Web3Provider(ethereum);

    // }
    try {
      if (!ethereum) return alert("Please install an ETH wallet");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // const contractAddress = "0xfF79f9C507ebA207a02C6c7ce6d13f30DF09d9d2";
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const transactionContract = new ethers.Contract(
      //   contractAddress,
      //   Staking.abi,
      //   signer
      // );

      // const USDTaddress = "0xfab46e002bbf0b4509813474841e0716e6730136";
      // const usdtContract = new ethers.Contract(USDTaddress, USDT.abi, signer);

      // console.log("contract loaded");

      // const chainBalance = await usdtContract.balanceOf(accounts[0]);

      // console.log(chainBalance.toString());

      // const accounts = await provider.send("eth_requestAccounts", []);

      setCurrentAccount(accounts[0]);
      setOnChainBalance(accounts[0]);
      hasStaked();
      hasPledged();
      setPledgeBalance();
      setPledgeIncome();
      setCumulatedPledgeBalance();
      setCumulatedPledgeIncome();
      await setHourlyIncome();
      setAccountBalance(hourlyIncome);
      setTodayIncome(hourlyIncome);
      setCumulativeIncome(hourlyIncome);
      // console.log(state);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    var tawk = new TawkTo("637e4f51b0d6371309d0baa0", "1giimbm30");

    tawk.onStatusChange((status) => {
      console.log("status");
    });

  }, []);
  // console.log(currentAccount);

  return (
    <header className="header header__shrink">
      <Container>
        <div className="navigation">
          <div className="logo">
            <span className="mobile__menu">
              {toggleMenu ? (
                <AiOutlineClose
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                  }}
                />
              ) : (
                <HiMenuAlt4
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                  }}
                />
              )}
            </span>

            <Link to="/home" className=" d-flex gap-2 align-items-center">
              <h2 className=" d-flex gap-2 align-items-center ">
                <span>
                  <i class="ri-fire-fill"></i>
                </span>
                META
              </h2>
            </Link>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            {currentAccount ? (
              <div className="login-buttons">
                {/* <button className="logout-btn" onClick={logout}>
                  logout
                </button> */}

                <div className="erc">
                  <span>ERC</span>
                </div>
                <div className="account-id">
                  <span>{`${shortenAddress(currentAccount)}`}</span>
                </div>
              </div>
            ) : (
              <button
                className="btn d-flex gap-2 align-items-center"
                onClick={() => {
                  connectWallet();
                }}
              >
                <span>
                  <i class="ri-wallet-line"></i>
                </span>
                Connect Wallet
              </button>
            )}
          </div>

          {/*This is rendered only if toggleMenu is true*/}

          <div className={`nav__menu ${toggleMenu ? "" : "active__menu"}`}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

const mapStateToProps = (state) => ({
  currentAccount: state.account.currentAccount,
  staking: state.user.staking,
  usdt: state.user.usdt,
  decimals: state.data.decimals,
  hourlyIncome: state.data.hourlyIncome,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentAccount: (account) => dispatch(setCurrentAccount(account)),
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
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
