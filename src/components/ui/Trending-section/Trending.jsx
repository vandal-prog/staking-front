import React from "react";
import { Container, Row, Col } from "reactstrap";
import Carousel from "react-elastic-carousel";

import { NFT__DATA } from "../../../assets/data/data";
import "./trending.css";

import NftCard from "../Nft-card/NftCard";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Trending = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <h3 className="trending__title">NFT pledge income</h3>
          </Col>
          <p>
            In the Automated market makers (AMM) pool, anyone can add liquidity
            to any NFT transaction in order to earn interest from market making.{" "}
          </p>

          <div className="carousel">
            <Carousel breakPoints={breakPoints}>
              {NFT__DATA.slice(9, 16).map((item) => (
                <Col key={item.id} className="mb-4 carousel-card">
                  <NftCard item={item} pledge />
                </Col>
              ))}
            </Carousel>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
