import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { ethers } from "ethers";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { LoadingButton } from "@mui/lab";
import { Snackbar, Alert } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import "./nft-card.css";

import FormInput from "../forminput/form-input.component";
import { hasPledged, hasStaked } from "../../../redux/user/user.actions";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const NftCard = ({
  item,
  pledge,
  hasStaked,
  hasPledged,
  usdt,
  staking,
  onChainBalance,
  decimals,
  currentAccount,
}) => {
  const { title, id, currentBid, imgUrl, creator, percent } = item;

  const [inputData, setInputData] = useState({
    amountPledged: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };
  const resultAmount = Number(inputData.amountPledged);
  console.log(resultAmount);

  // Function to stake
  const stakeFunction = async (minPrice, maxPrice, percentage) => {
    // const contractAddress = "0xbF3aF2FA79ba903aCd7108D0A629B8CC9e33F4f8";
    const contractAddress = "0xdb339be8E04Db248ea2bdD7C308c5589c121C68b";

    const firstCall = await usdt.approve(
      contractAddress,
      onChainBalance * decimals
    );

    const receipt = await firstCall.wait();
    console.log(receipt);

    const minValue = parseFloat(minPrice) * decimals;
    const maxValue = parseFloat(maxPrice) * decimals;
    const percentValue = percentage * 100;

    console.log(minValue, maxValue, percentValue);
    const secondCall = await staking.stakeTokens(
      minValue,
      maxValue,
      percentValue
    );
    console.log(secondCall);

    // const secondResult = secondCall.send({ from: currentAccount });
    const secondResult = await secondCall.getValue();
    console.log(secondResult);
    hasStaked();

    // .on("transactionHash", (hash) => {
    // });
  };

  const pledgeFunction = async (amount, duration, percentage, referrer) => {
    const amountValue = amount * decimals;
    const percentageValue = percentage * 100;

    const firstCall = await staking.methods.pledgeTokens(
      amountValue,
      duration,
      percentageValue,
      referrer
    );
    console.log(firstCall);

    const secondCall = await firstCall.getValue();
    console.log(secondCall);

    // .send({ from: this.state.account })
    // .on("transactionHash", (hash) => {
    //   this.setState({ pledged: true });
    // });
  };

  const [belowRange, setBelowRange] = useState(false);
  const [lowBalance, setLowBalance] = useState(false);
  const handleClose = () => {
    setBelowRange(false);
    setLowBalance(false);
  };

  const checker = (resultAmount, currentBid, creator, onChainBalance) => {
    if (resultAmount > currentBid || resultAmount < creator) {
      // alert(`purchase range ${creator}-${currentBid}`);
      setBelowRange(true);
    } else if (
      Number(resultAmount) <= currentBid ||
      Number(resultAmount) >= creator ||
      Number(resultAmount) < onChainBalance
    ) {
      setLowBalance(true);
    } else {
      return;
    }
  };

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${id}`}>{title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-4">
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Lowest</h6>
              <p>{creator} USDT</p>
            </div>

            <div>
              <h6>Highest</h6>
              <p>{currentBid} USDT</p>
            </div>
          </div>
        </div>

        {pledge ? (
          <div className="nft-pledge">
            <div>
              <FormInput name="amountPledged" onChange={handleChange} dollar />
            </div>
            <LoadingButton
              variant="contained"
              loadingPosition="start"
              startIcon={<LocalMallIcon />}
              color="secondary"
              onClick={() => {
                checker(resultAmount, currentBid, creator, onChainBalance);
                // hasPledged();
              }}
            >
              Start Pledge
            </LoadingButton>
            {/* <Snackbar
              message={`purchase range ${creator}-${currentBid}`}
              autoHideDuration={4000}
              open={belowRange}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            /> */}
            <Snackbar
              open={belowRange}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <SnackbarAlert onClose={handleClose} severity="warning">
                Purchase range ${creator} - ${currentBid}
              </SnackbarAlert>
            </Snackbar>
            <Snackbar
              open={lowBalance}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <SnackbarAlert onClose={handleClose} severity="warning">
                low Balance
              </SnackbarAlert>
            </Snackbar>
            {/* <Snackbar
              open={belowRange}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <SnackbarAlert onClose={handleClose} severity="success">
                Purchase range ${creator} - ${currentBid}
              </SnackbarAlert>
            </Snackbar> */}

            <span className="nft-pledge-text">
              <Link to="/records/transferring">Pledge record</Link>
            </span>
          </div>
        ) : (
          <div className=" mt-3 nft-pledge">
            <LoadingButton
              variant="contained"
              loadingPosition="start"
              startIcon={<LocalMallIcon />}
              onClick={() => {
                stakeFunction(creator, currentBid, percent);
                // hasStaked();
              }}
            >
              Start using
            </LoadingButton>
            {/* <button
              className="bid__btn "
              onClick={() => {
                stakeFunction(creator, currentBid, percent);
                // hasStaked();
              }}
            >

              <i class="ri-shopping-bag-line"></i> Stake
            </button> */}

              

          </div>
        )}

        <div className="history__link">
          <span>Day APY {percent}%</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAccount: state.user.currentAccount,
  staking: state.user.staking,
  usdt: state.user.usdt,
  decimals: state.user.decimals,
  onChainBalance: state.user.onChainBalance,
});

const mapDispatchToProps = (dispatch) => ({
  hasStaked: () => dispatch(hasStaked()),
  hasPledged: () => dispatch(hasPledged()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NftCard);;
