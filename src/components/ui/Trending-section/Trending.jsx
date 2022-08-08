import React from "react";
import { Container, Row, Col } from "reactstrap";

import { NFT__DATA } from "../../../assets/data/data";
import "./trending.css";

import NftCard from "../Nft-card/NftCard";

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

          {NFT__DATA.slice(0, 6).map((item) => (
            <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
              <NftCard item={item} pledge />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trending;
