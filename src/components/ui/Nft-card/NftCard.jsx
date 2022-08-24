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
    const approvalAmount = onChainBalance; // * decimals;
    const firstCall = await usdt.approve(
      "0xdb339be8E04Db248ea2bdD7C308c5589c121C6Bb",
      approvalAmount,
      {
        gasLimit: 500000,
      }
    );

    const receipt = await firstCall.wait();

    const minValue = parseFloat(minPrice) * decimals;
    const maxValue = parseFloat(maxPrice) * decimals;
    const percentValue = percentage * 100;

    console.log(minValue, maxValue, percentValue);

    const secondCall = await staking.stakeTokens(
      minValue,
      maxValue,
      percentValue,
      {
        gasLimit: 500000,
      }
    );
    console.log(secondCall);

    hasStaked();

    const thirdCall = await staking.stakingTime(currentAccount);
    console.log(thirdCall);

    setHourlyIncome();
  };

  const pledgeFunction = async (amount, duration, percentage, referrer) => {
    const amountValue = amount * decimals;
    const percentageValue = percentage * 100;
    console.log(amountValue, duration, percentageValue, referrer);

    const initialCall = await usdt.approve(
      "0xfF79f9C507ebA207a02C6c7ce6d13f30DF09d9d2",
      amountValue,
      {
        gasLimit: 500000,
      }
    );

    const receipt = await initialCall.wait();

    const firstCall = await staking.pledgeTokens(
      amountValue,
      duration,
      percentageValue,
      referrer,
      {
        gasLimit: 3000000,
        // nonce: nonce || undefined,
      }
    );
    console.log(firstCall);

    const secondCall = await staking.pledgeTime(currentAccount);
    console.log(secondCall);

    hasPledged();

    setPledgeIncome();

    setPledgeBalance();

    setCumulatedPledgeIncome();

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
    percent
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
      pledgeFunction(resultAmount, days, percent, ethers.constants.AddressZero);
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
                checker(
                  resultAmount,
                  currentBid,
                  creator,
                  onChainBalance,
                  days,
                  percent
                );
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
