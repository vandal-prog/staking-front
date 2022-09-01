import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

//import { Container, Row, Col, Placeholder } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import QRCode from "qrcode.react";
//
//
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {
  setReferralAddress,
  setReferralLink,
} from "../redux/user/user.actions";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";

//
import "../styles/create-item.css";

const Create = ({
  User,
  staking,
  decimals,
  referralIncome,
  Data,
  Theuseraddress,
  TheuserreferallLink,
  setReferralLink,
}) => {
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  const UserLink = `https://www.nftsmetapool.com/${Theuseraddress}`;
  const [shortenedUserLink, setshortenedUserLink] = useState();

  const [firstPopulationCount, setfirstPopulationCount] = useState();
  const [secoundPopulationCount, setsecoundPopulationCount] = useState();
  const [thirdPopulationCount, setthirdPopulationCount] = useState();
  const [firstPopulationIncome, setfirstPopulationIncome] = useState();
  const [secondPopulationIncome, setsecondPopulationIncome] = useState();
  const [thridPopulationIncome, setthridPopulationIncome] = useState();
  const [teamsize, setteamsize] = useState();

  const UserReferalLinkFunction = () => {
    if (TheuserreferallLink) {
      setshortenedUserLink(TheuserreferallLink);
    } else {
      axios
        .get("https://api.shrtco.de/v2/shorten?url=" + UserLink)
        .then((response) => {
          setshortenedUserLink(response.data.result.full_short_link);
          setReferralLink(response.data.result.full_short_link);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const firstPopulationCountFunction = async () => {
    let firstPopulationCountValue = await staking.firstGenerationReferral(
      Theuseraddress
    );
    setfirstPopulationCount(firstPopulationCountValue.toNumber());
  };

  const secondPopulationCountFunction = async () => {
    let secondPopulationCountValue = await staking.secondGenerationReferral(
      Theuseraddress
    );
    setsecoundPopulationCount(secondPopulationCountValue.toNumber());
  };

  const thirdPopulationCountFunction = async () => {
    let thirdPopulationCountValue = await staking.thirdGenerationReferral(
      Theuseraddress
    );
    setthirdPopulationCount(thirdPopulationCountValue.toNumber());
  };

  const firstPopulationIncomeFunction = async () => {
    let firstPopulationIncomeValue = await staking.firstGenerationIncome(
      Theuseraddress
    );
    let firstPopulationIncomereal = firstPopulationIncomeValue / decimals;
    setfirstPopulationIncome(firstPopulationIncomereal)
  };

  const secondPopulationIncomeFunction = async () => {
    let secondPopulationIncomeValue =
      staking.secondGenerationIncome(Theuseraddress);
    let secondPopulationIncomereal = secondPopulationIncomeValue / decimals;
    setsecondPopulationIncome(secondPopulationIncomereal)
  };

  const thirdPopulationIncomeFunction = async () => {
    let thirdPopulationIncomeValue =
      staking.thirdGenerationIncome(Theuseraddress);
    let thirdPopulationIncomereal = thirdPopulationIncomeValue / decimals;
    setthridPopulationIncome(thirdPopulationIncomereal)
  };

  const ReferralIncomeFunction = async () => {
    let referallIncomeValue = 
      staking.referralIncome(Theuseraddress);
    // console.log(referallIncomeValue)
  }

  const teamSizeFunction = async () => {
    let teamSize = staking.teamSize(Theuseraddress);
    setteamsize(teamSize.BigNumber)
  };

  useEffect( () => {
    UserReferalLinkFunction()
    firstPopulationCountFunction()
    secondPopulationCountFunction()
    thirdPopulationCountFunction()
    firstPopulationIncomeFunction()
    secondPopulationIncomeFunction()
    thirdPopulationIncomeFunction()
    teamSizeFunction()
    ReferralIncomeFunction()
  }, [] )

  const DataValues = ({ title, value }) => (
    <div className="datavalues">
      <div className="datavalues-title" style={{ color: "white" }}>
        {title}
      </div>
      <div className="datavalues-value" style={{ color: "white" }}>
        {value}
      </div>
    </div>
  );

  return (
    <>
      <CommonSection title="INVITE FRIENDS" />

      <section>
        <Container className="bg-dark border-dark blue">
          <Row>
            <Col>
              <div
                style={{ marginTop: 30, marginButtom: 30, display: "center" }}
              >
                <center>
                  <QRCode
                    value={shortenedUserLink}
                    bgColor="white"
                    fgColor="black"
                    style={{ marginRight: 28, borderRadius: 10 }}
                  />
                </center>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={5}>
              <input
                type="text"
                disabled={true}
                ref={textAreaRef}
                className="newsletter"
                value={UserLink}
              />
            </Col>
          </Row>

          <row className="justify-content-md-right">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                border: "none",
              }}
            >
              <CopyToClipboard text={shortenedUserLink}>
                <button
                  className="button"
                  onClick={() => setCopySuccess("Copied!")}
                >
                  Copy
                </button>
              </CopyToClipboard>

              {copySuccess}
            </div>
          </row>
        </Container>

        <div className="port">
          <Container className="bg-dark border-dark">
            <p>
              Invite your friends & family and get profit from refferal bonus
            </p>

            <p>
              Each member receive a unique referral link to share with friends
              and family and earn bonuses
            </p>

            <p>for their pledge output 30.0%,20.0%,10.0%</p>
          </Container>
        </div>

        <br></br>

        <Container className="bg-blue">
          <div className="kettle">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>
                    Team Size
                    <DataValues />
                  </th>
                  <th>
                    Team Earnings
                    <DataValues />
                  </th>
                </tr>
              </thead>
            </Table>
          </div>

          <div className="account-container-header">1st Population</div>
          <div className="account-marketBal">
            <DataValues
              title="income:"
              value={ firstPopulationIncome + "USDT"}
            />
            <DataValues title="people:" value={firstPopulationCount} />
          </div>

          <div className="account-container-header">2nd Population</div>
          <div className="account-marketBal">
            <DataValues
              title="income:"
              value={ secondPopulationIncome + "USDT"}
            />
            <DataValues title="people:" value={secoundPopulationCount} />
          </div>

          <div className="account-container-header">3rd Population</div>
          <div className="account-marketBal">
            <DataValues
              title="income:"
              value={ thridPopulationIncome + "USDT"}
            />
            <DataValues title="people:" value={thirdPopulationCount} />
          </div>
        </Container>
      </section>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setReferralAddress: (address) => dispatch(setReferralAddress(address)),
  setReferralLink: (link) => dispatch(setReferralLink(link)),
});

const mapStateToProps = (state) => ({
  Theuseraddress: state.account.currentAccount,
  Myreferral: state.referral.ReferralAddress,
  TheuserreferallLink: state.referral.ReferralLink,
  User: state.user,
  Data: state.data,
  staking: state.user.staking,
  decimals: state.data.decimals,
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
