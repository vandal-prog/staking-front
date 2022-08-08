import React from "react";
import "./about.css";
import { Container, Col } from "reactstrap";
import { Media } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <section>
      <Container>
        <div className="App">
          <Col lg="12" className="mb-5">
            <div className="seller__section-title">
              <h3> About Us</h3>
            </div>
          </Col>
          <Media>
            <iframe
              title="Nft metapool"
              src="https://player.vimeo.com/video/717861399?h=5508ada992"
              width="100%"
              hei3ght="360"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>

            <Media body>
              <br></br>
              <div className="about">
                <Media heading>Our Mission</Media>
              </div>
              <br></br>
              <div className="about1">
                people now have a lot of opportunities since NFTs were
                developed. This technology can be applied to numerous fields.
                NFTs are widely used for creative and artistic purposes. NFTs
                allow everyone to express themselves and follow his work, while
                also benefiting from his creativity and ideas. There are now
                many NFT marketplaces. The high costs of creating collectibles
                and the complexity of making them keep most markets out of reach
                for most people. There is no way to sell NFTs at reasonable
                prices since large commissions make the creation of NFTs
                unprofitable. NFT authors in particular have to pay exorbitant
                network commissions for their work. NFTs are then only available
                to those who can pay all collection costs and commissions. Our
                main goal is to make NFTs accessible to everyone, so that anyone
                can create NFTs, but also buy any NFT without paying commissions
                or paying exorbitant prices. We make NFTs accessible to
                everyone. It is our mission.
              </div>
            </Media>
          </Media>
        </div>
      </Container>
    </section>
  );
};

export default About;
