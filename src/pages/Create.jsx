import React, {useRef, useState,useEffect} from "react";
import { connect } from "react-redux";

//import { Container, Row, Col, Placeholder } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import QRCode from "qrcode.react";
//  
//  
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {
  setReferralAddress,
  setReferralLink
} from "../redux/user/user.actions";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';

//  
import "../styles/create-item.css";


const Create = ({
  User,
  thridPopulationCount,
  firstPopulationIncome,
  secondPopulationIncome,
  thridPopulationIncome,
  referralIncome,
  Data,
  Theuseraddress,
  TheuserreferallLink,
  setReferralLink
}) => {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const UserLink = `https://nftsmetapool.com/${Theuseraddress}`;
  const [ shortenedUserLink, setshortenedUserLink ] = useState();

  const [ firstPopulationCount, setfirstPopulationCount ] = useState(2)
  const [ secoundPopulationCount, setsecoundPopulationCount ] = useState(2)
  const [ thirdPopulationCount, setthirdPopulationCount ] = useState(2)


  const UserReferalLinkFunction = () => {

    if ( TheuserreferallLink ) {
      setshortenedUserLink(TheuserreferallLink)
    }else{
      axios.get('https://api.shrtco.de/v2/shorten?url='+ UserLink ).then(
        response => {
          setshortenedUserLink(response.data.result.full_short_link);
          setReferralLink(response.data.result.full_short_link);
        }
      ).catch( (e) => {
  
        console.log(e)
  
      } )
    }
  };


  const firstPopulationCountFunction = async () => {
    let firstPopulationCountValue = await User.staking
      .firstGenerationReferral(Theuseraddress); 
    setfirstPopulationCount(firstPopulationCountValue);
  };

  const secondPopulationCountFunction = async () => {
    let secondPopulationCountValue = await User.staking
      .secondGenerationReferral(Theuseraddress);
      setsecoundPopulationCount(secondPopulationCountValue)
  };

  const thirdPopulationCountFunction = async () => {
    let thirdPopulationCountValue = await User.staking
      .thirdGenerationReferral(Theuseraddress);
      setthirdPopulationCount(thirdPopulationCountValue );
  };




  const firstPopulationIncomeFunction = async () => {
    let firstPopulationIncomeValue = await User.staking
      .firstGenerationIncome(Theuseraddress);
    // this.setState({
    //   firstPopulationIncome: firstPopulationIncomeValue / this.state.decimals,
    // });
    alert(firstPopulationIncomeValue)
  };


  const secondPopulationIncomeFunction = async () => {
    let secondPopulationIncome = this.state.staking.methods
      .secondGenerationIncome(this.state.account)
      .call();
    this.setState({
      secondPopulationIncome: secondPopulationIncome / this.state.decimals,
    });
  };



  useEffect( () => {

    UserReferalLinkFunction()
    firstPopulationCountFunction()
    secondPopulationCountFunction()
    thirdPopulationCountFunction()
    firstPopulationIncomeFunction()

  }, [TheuserreferallLink] )


  // function copyToClipboard(e) {
  //   textAreaRef.current.select();
  //   document.execCommand('copy');
  //   e.target.focus();
  //   setCopySuccess('Copied!');
  // };

  const DataValues = ({ title, value }) => (
    <div className="datavalues">
      <div className="datavalues-title" style={{"color":"white"}} >{title}</div>
      <div className="datavalues-value" style={{"color":"white"}}>{value}</div>
    </div>
  );

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
               value= {shortenedUserLink} bgColor="white" fgColor="blue" style={{ marginRight: 28, borderRadius: 28 }}/>
            </center>
          </div>
       </Col>
       </Row>
       <Row className="justify-content-md-center">
          <Col sm={5}>
             <input type="text" disabled={true} ref={textAreaRef} className="newsletter" value={shortenedUserLink} />
          </Col>
       </Row>
           

       <row className="justify-content-md-right">
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <CopyToClipboard text={shortenedUserLink}>
                <button className="button" onClick={ () => setCopySuccess('Copied!') } >
                  Copy
                </button>
            </CopyToClipboard>

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

    <Container className="bg-blue">
    <div className="kettle">
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          
          <th>Team Size
            <DataValues/>
          </th>
          <th>Team Earnings
            <DataValues/>
          </th>
          
        </tr>
      </thead>
      </Table>
    </div>

    <div className="account-container-header">1st Population</div>
        <div className="account-marketBal">
          <DataValues title="income:" value={`${firstPopulationIncome}USDT`} />
          <DataValues
            title="people:"
            value={firstPopulationCount}
          />
    </div>

    <div className="account-container-header">2nd Population</div>
        <div className="account-marketBal">
          <DataValues title="income:" value={`${secondPopulationIncome}USDT`} />
          <DataValues
            title="people:"
            value={`${secoundPopulationCount}`}
          />
    </div>

    <div className="account-container-header">3rd Population</div>
        <div className="account-marketBal">
          <DataValues title="income:" value={`${thridPopulationIncome}USDT`} />
          <DataValues
            title="people:"
            value={`${thirdPopulationCount}`}
          />
    </div>

    </Container>

     
       
    
        
  
      </section>
   </>
 );
};

const mapDispatchToProps = (dispatch) => ({
  setReferralAddress: (address) => dispatch(setReferralAddress(address)),
  setReferralLink: (link) => dispatch(setReferralLink(link))
});

const mapStateToProps = (state) => ({
  Theuseraddress: state.account.currentAccount,
  Myreferral: state.referral.ReferralAddress,
  TheuserreferallLink: state.referral.ReferralLink,
  User: state.user,
  Data: state.data
});

export default connect(mapStateToProps,mapDispatchToProps)(Create);
