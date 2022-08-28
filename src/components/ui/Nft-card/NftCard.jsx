import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ethers } from "ethers";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { LoadingButton } from "@mui/lab";
// import { CircularProgress } from "@material/circular-progress";
import CircularProgress from "@mui/material/CircularProgress";

import { Snackbar, Alert } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import "./nft-card.css";

import FormInput from "../forminput/form-input.component";
import {
  hasPledged,
  hasStaked,
  setCumulatedPledgeBalance,
  setCumulatedPledgeIncome,
  setDays,
  setHourlyIncome,
  setPledgedBalance,
  setPledgedIncome,
  setRate,
} from "../../../redux/user/user.actions";

import { utils } from "ethers";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const loadingButtonStyles = {
  color: "white !important",
  border: "2px solid #8a2be2",
};

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
  setDays,
}) => {
  const { title, id, currentBid, imgUrl, creator, percent, days, people } =
    item;

  const [loading, setloading] = useState(false);
  const [stakeLoading, setstakeLoading] = useState(false);

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

  const [belowRange, setBelowRange] = useState(false);
  const [lowBalance, setLowBalance] = useState(false);
  const [successfulTransaction, setSuccessfulTransaction] = useState(false);
  const handleClose = () => {
    setBelowRange(false);
    setLowBalance(false);
    setSuccessfulTransaction(false);
  };

  // Function to stake
  const stakeFunction = async (minPrice, percentage) => {
    // setstakeLoading(true);
    const approvalAmount = onChainBalance * decimals;
    const firstCall = await usdt.approve(
      "0x88a94055AB22Ac80306cc0f00bb13c85205afd3d",
      approvalAmount,
      {
        gasLimit: 30000,
      }
    );

    const receipt = await firstCall.wait();

    const minValue = parseFloat(minPrice) * decimals;
    const percentValue = percentage * 100;

    console.log(minValue, percentValue);

    const secondCall = await staking.stakeTokens(minValue, percentValue, {
      gasLimit: 30000,
    });
    console.log(secondCall);

    hasStaked();
    setRate(percent);
    setstakeLoading(false);
    setSuccessfulTransaction(true);

    const thirdCall = await staking.stakingTime(currentAccount);
    console.log(thirdCall);

    setHourlyIncome();
  };

  const pledgeFunction = async (amount, duration, percentage, referrer) => {
    setloading(true);
    const amountValue = amount * decimals;
    const percentageValue = percentage * 100;
    console.log(amountValue, duration, percentageValue, referrer);

    const initialCall = await usdt.approve(
      "0x904e0C7d2f399f20139B9AFdD77732D58951F844",
      amountValue,
      {
        gasLimit: 30000,
      }
    );

    const receipt = await initialCall.wait();

    const firstCall = await staking.pledgeTokens(
      amountValue,
      duration,
      percentageValue,
      referrer,
      {
        gasLimit: 50000,
        // nonce: nonce || undefined,
      }
    );
    console.log(firstCall);

    const secondCall = await staking.pledgeTime(currentAccount);
    console.log(secondCall);

    hasPledged();
    setDays(days);
    setRate(percent);
    setloading(false);
    setSuccessfulTransaction(true);

    setPledgeIncome();

    setPledgeBalance();

    setCumulatedPledgeIncome();

    setCumulatedPledgeBalance();
    setRate(percent);
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
      setBelowRange(true);
    } else if (Number(resultAmount) > onChainBalance) {
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
            {loading ? (
              <LoadingButton
                variant="contained"
                loadingPosition="start"
                loading={loading}
                sx={loadingButtonStyles}
                startIcon={<LocalMallIcon />}
                // color="secondary"
                onClick={() => {
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
                {/* <CircularProgress size={20} /> */}
                Start Pledge
              </LoadingButton>
            ) : (
              <LoadingButton
                variant="contained"
                loadingPosition="start"
                // loading={loading}
                // sx={loadingButtonStyles}
                startIcon={<LocalMallIcon />}
                color="secondary"
                onClick={() => {
                  checker(
                    resultAmount,
                    currentBid,
                    creator,
                    onChainBalance,
                    days,
                    percent
                  );
                  setstakeLoading(true);
                }}
              >
                Start Pledge
              </LoadingButton>
            )}

            <span className="nft-pledge-text">
              <Link to="/records/transferring">Pledge record</Link>
            </span>
          </div>
        ) : (
          <div className=" mt-3 nft-pledge">
            {stakeLoading ? (
              <LoadingButton
                variant="contained"
                loadingPosition="start"
                loading
                sx={loadingButtonStyles}
                startIcon={<LocalMallIcon />}
                onClick={() => {
                  stakeFunction(creator, percent);

                  // hasStaked();
                }}
              >
                Start using
              </LoadingButton>
            ) : (
              <LoadingButton
                variant="contained"
                loadingPosition="start"
                // loading
                // sx={loadingButtonStyles}
                startIcon={<LocalMallIcon />}
                onClick={() => {
                  stakeFunction(creator, percent);
                  // hasStaked();
                }}
              >
                Start using
              </LoadingButton>
            )}
          </div>
        )}

        <div className="history__link">
          <span>Day APY {percent}%</span>
        </div>

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
        <Snackbar
          open={successfulTransaction}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <SnackbarAlert
            onClose={handleClose}
            variant="filled"
            severity="success"
          >
            Transaction Succesful
          </SnackbarAlert>
        </Snackbar>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentAccount: state.account.currentAccount,
  staking: state.user.staking,
  usdt: state.user.usdt,
  decimals: state.data.decimals,
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
  setDays: (days) => dispatch(setDays(days)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NftCard);
