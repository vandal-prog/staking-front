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

import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import {
  setCurrentAccount,
  setOnChainBalance,
  hasStaked,
  hasPledged,
} from "../../redux/user/user.actions";
import TawkTo from 'tawkto-react';

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
}) => {
  // const { currentAccount, connectWallet, setOnChainBalance } =
  //   useContext(TransactionContext);

  const { ethereum } = window;

  const [toggleMenu, setToggleMenu] = useState(false);

  const connectWallet = async () => {
    // const provider = new ethers.providers.Web3Provider(ethereum);

    // }
    try {
      if (!ethereum) return alert("Please install metamask");

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
      await setOnChainBalance(accounts[0]);
      await hasStaked();
      await hasPledged();
      // console.log(state);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect( () => {

    var tawk = new TawkTo("62ff470f54f06e12d88f87f1", "1gaqir5gs")

    tawk.onStatusChange((status) => 
    {
        console.log("status")
    })
    
  }, [] )

  console.log(currentAccount);

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
  currentAccount: state.user.currentAccount,
  staking: state.user.staking,
  usdt: state.user.usdt,
  decimals: state.user.decimals,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentAccount: (account) => dispatch(setCurrentAccount(account)),
  setOnChainBalance: (balance) => dispatch(setOnChainBalance(balance)),
  hasStaked: (stakedBool) => dispatch(hasStaked(stakedBool)),
  hasPledged: (pledgedBool) => dispatch(hasPledged(pledgedBool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
