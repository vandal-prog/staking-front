import React from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import QRCode from "qrcode.react";


import "../styles/create-item.css";


const Create = () => {
  return (
   <>
      <CommonSection title="INVITE FRIENDS" />

     <section>
       <div className="port">
         <Container className="bg-dark border-dark">

           <p>Invite your friends & family and get profit from refferal bonus</p>
        
           <p>Each member receive a unique referral link to share with friends and family and earn bonuses</p>
          
             <p>for their pledge output 30.0%,20.0%,10.0%</p>
          
         </Container>
       </div>
       <Container className="bg-dark border-dark blue">
        <Row>
          <Col>
          
          </Col>

        </Row>

       </Container>

      </section>
   </>
 );
};

export default Create;
