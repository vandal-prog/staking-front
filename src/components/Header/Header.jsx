import React, { useRef, useEffect, Component } from "react";
import "./header.css";
import { Container } from "reactstrap";

import { NavLink } from "react-router-dom";







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
    url: "/contact",
  },
  {
    display: "FAQ",
    url: "/contact",
  },
];








const Header = () => {

  
  
  
  const headerRef = useRef(null);

  const menuRef = useRef(null);

  
  
  

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i class="ri-fire-fill"></i>
              </span>
              NFT METAPOOL
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
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

         

             <div className="nav__right d-flex align-items-center gap-5 ">
            
                <button  className="btn d-flex gap-2 align-items-center" textcolor="" >
                  <span>
                    <i class="ri-wallet-line"></i>
                  </span>
                   Connect Wallet
                </button>
            

               <span className="mobile__menu">
                <i class="ri-menu-line" ></i>
                </span>
            </div>

          


        
        </div>
      </Container>
    </header>
  );
};


export default Header;
