import React, { useRef, useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import "./header.css";
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";

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
    display: "whitepaper",
    url: "/contact",
  },
  {
    display: "Account",
    url: "/account",
  },
  {
    display: "FAQ",
    url: "/contact",
  },
];

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
                NFT METAPOOL
              </h2>
            </Link>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <button
              className="btn d-flex gap-2 align-items-center"
              textcolor=""
            >
              <span>
                <i class="ri-wallet-line"></i>
              </span>
              <Link to="/wallet">Connect Wallet</Link>
            </button>
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

export default Header;
