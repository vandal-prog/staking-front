import React, {useRef, useState} from "react";

import { Container, Row, Col, Placeholder } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import QRCode from "qrcode.react";


import "../styles/create-item.css";


const Create = ({
  link,
  firstPopulationCount,
  secondPopulationCount,
  thridPopulationCount,
  firstPopulationIncome,
  secondPopulationIncome,
  thridPopulationIncome,
  referralIncome,
  teamSize,

}) => {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
<>
      <CommonSection title="INVITE FRIENDS" />

  <section>
    <Container className="bg-dark border-dark blue" >
        <Row>
        <Col>
          <div style={{ marginTop: 30, marginButtom: 30, display: "center"}}>
            <center>
              <QRCode
               value= {link} bgColor="white" fgColor="blue" style={{ marginRight: 28, borderRadius: 28 }}/>
            </center>
          </div>
       </Col>
       </Row>
       <Row className="justify-content-md-center">
          <Col sm={5}>
             <input type="text" ref={textAreaRef} className="newsletter" value={link} />
          </Col>
       </Row>
           

       <row className="justify-content-md-right">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              className="button"
              onClick={copyToClipboard}>Copy
            </button> 
               {copySuccess}
          </div>
        </row> 

    </Container>

    <div className="port">
         <Container className="bg-dark border-dark">

           <p>Invite your friends & family and get profit from refferal bonus</p>
        
           <p>Each member receive a unique referral link to share with friends and family and earn bonuses</p>
          
             <p>for their pledge output 30.0%,20.0%,10.0%</p>
          
         </Container>
       </div>

       <br></br>

       <div className="port">
         <Container className="bg-indigo border-dark">
        
          
         </Container>
       </div>
    
          

      </section>
   </>
 );
};

export default Create;
