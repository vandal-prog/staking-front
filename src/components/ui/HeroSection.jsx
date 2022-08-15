import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

import heroImg from "../../assets/images/hero.png";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>
                Stake and earn the yield on the most
                <span>liquidity decentralized</span> NFT marketplace
              </h2>
              <p>
                NFT technology with us is the highest level of general development and has great potential for profit.
              </p>

              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i class="ri-rocket-line"></i>{" "}
                  <Link to="/market">Explore</Link>
                </button>
              </div>
              <div className="hero__btns d-flex align-items-center gap-2">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i class="ri-image-line"></i>{" "}
                  <a href="https://drive.google.com/file/d/1t59344hTlVz5sykO-ZWa3shnNru4gYAJ/view" 
                    rel="noreferrer">
                  WHITEPAPER
                  </a>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
