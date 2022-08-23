import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ethers } from "ethers";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { LoadingButton } from "@mui/lab";
import { Snackbar, Alert } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import "./nft-card.css";

import FormInput from "../forminput/form-input.component";
import {
  hasPledged,
  hasStaked,
  setCumulatedPledgeBalance,
  setCumulatedPledgeIncome,
  setHourlyIncome,
  setPledgedBalance,
  setPledgedIncome,
  setRate,
} from "../../../redux/user/user.actions";

import { utils } from "ethers";

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
  setPledgeBalance,
  setPledgeIncome,
  setCumulatedPledgeIncome,
  setCumulatedPledgeBalance,
  setHourlyIncome,
  setRate,
}) => {
  const { title, id, currentBid, imgUrl, creator, percent, days, people } =
    item;

  const [inputData, setInputData] = useState({
    amountPledged: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };
  const Amount = Number(inputData.amountPledged);
  const resultAmount = Amount.toString();
  // console.log(resultAmount);

  // Function to stake
  const stakeFunction = async (minPrice, maxPrice, percentage) => {
    const balance = onChainBalance / decimals;
    const firstCall = await usdt.approve(
      "0xdb339be8E04Db248ea2bdD7C308c5589c121C6Bb",
      balance
    );

    const receipt = await firstCall.wait();
    console.log(receipt);

    const minValue = parseFloat(minPrice);
    const maxValue = parseFloat(maxPrice);
    const percentValue = percentage * 100;

    console.log(minValue, maxValue, percentValue);

    const secondCall = await staking.stakeTokens(
      minValue,
      maxValue,
      percentValue
    );
    console.log(secondCall);

    // These needs to be mapped into state

    // const secondResult = await staking.hasStaked(currentAccount);
    // console.log(secondResult);
    hasStaked();

    const thirdCall = await staking.stakingTime(currentAccount);
    console.log(thirdCall);

    // const fourthCall = await staking.hourlyIncome(currentAccount);
    // console.log(fourthCall);
    setHourlyIncome();
  };

  const pledgeFunction = async (amount, duration, percentage, referrer) => {
    const amountValue = amount * decimals;
    const pledgeAmount = utils.formatEther(amountValue);
    console.log(pledgeAmount);
    const percentageValue = percentage * 100;

    const firstCall = await staking.pledgeTokens(
      pledgeAmount,
      duration,
      percentageValue,
      referrer
    );
    console.log(firstCall);

    // These need to be mapped into state

    const secondCall = await staking.pledgeTime(currentAccount);
    console.log(secondCall);

    // const thirdCall = await staking.hasPledged(currentAccount);
    // console.log(thirdCall);
    hasPledged();

    // const fourthCall = await staking.pledgeIncome(currentAccount);
    // console.log(fourthCall);
    setPledgeIncome();

    // const fifthCall = await staking.pledgeBalance(currentAccount);
    // console.log(fifthCall);
    setPledgeBalance();

    // const sixthCall = await staking.cumulatedPledgeIncome(currentAccount);
    // console.log(sixthCall);
    setCumulatedPledgeIncome();

    // const seventhCall = await staking.cumulatedPledgeBalance(currentAccount);
    // console.log(seventhCall);
    setCumulatedPledgeBalance();
    setRate(percent);
  };

  const [belowRange, setBelowRange] = useState(false);
  const [lowBalance, setLowBalance] = useState(false);
  const handleClose = () => {
    setBelowRange(false);
    setLowBalance(false);
  };

  const checker = (
    resultAmount,
    currentBid,
    creator,
    onChainBalance,
    days,
    percent,
    referrer
  ) => {
    if (resultAmount > currentBid || resultAmount < creator) {
      // alert(`purchase range ${creator}-${currentBid}`);
      setBelowRange(true);
    } else if (
      // Number(resultAmount) >= currentBid ||
      // Number(resultAmount) <= creator ||
      Number(resultAmount) > onChainBalance
    ) {
      setLowBalance(true);
    } else {
      pledgeFunction(resultAmount, days, percent, ethers.costants.AddressZero);
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

        {pledge && (
          <div>
            <div className="creator__breakline">
              <hr />
            </div>

            <div className="creator__period">
              <h6>Total period</h6>
              <p>{days}</p>
            </div>

            <div className="creator__breakline">
              <hr />
            </div>
            <div className="creator__period">
              <h6>Total people</h6>
              <p>{people}</p>
            </div>
          </div>
        )}

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
                setRate(percent);
                checker(resultAmount, currentBid, creator, onChainBalance);
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
                setRate(percent);
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
  currentAccount: state.account.currentAccount,
  staking: state.user.staking,
  usdt: state.user.usdt,
  decimals: state.user.decimals,
  onChainBalance: state.data.onChainBalance,
});

const mapDispatchToProps = (dispatch) => ({
  hasStaked: () => dispatch(hasStaked()),
  hasPledged: () => dispatch(hasPledged()),
  setPledgeIncome: () => dispatch(setPledgedIncome()),
  setPledgeBalance: () => dispatch(setPledgedBalance()),
  setCumulatedPledgeIncome: () => dispatch(setCumulatedPledgeIncome()),
  setCumulatedPledgeBalance: () => dispatch(setCumulatedPledgeBalance()),
  setHourlyIncome: () => dispatch(setHourlyIncome()),
  setRate: (percent) => dispatch(setRate(percent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NftCard);
