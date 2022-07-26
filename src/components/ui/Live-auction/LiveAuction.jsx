import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Carousel from "react-elastic-carousel";

import NftCard from "../Nft-card/NftCard";
import { NFT__DATA } from "../../../assets/data/data.js";

import "./live-auction.css";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const LiveAuction = () => {
  return (
    <section>
      <Container fluid>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="live__auction__top d-flex align-items-center justify-content-between ">
              <h3>NFT market making income</h3>
              <span>
                <Link to="/market">Explore more</Link>
              </span>
            </div>
          </Col>
          <p>
            In the automated markers(AMM) pool, anyone can add liquidity to any
            NFT transaction in order to earn interest from market making
          </p>

          <div className="carousel">
            <Carousel breakPoints={breakPoints}>
              {NFT__DATA.slice(0, 6).map((item) => (
                <Col key={item.id} className="mb-4 carousel-card">
                  <NftCard item={item} />
                </Col>
              ))}
            </Carousel>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default LiveAuction;
