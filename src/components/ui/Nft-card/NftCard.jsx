import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ethers } from "ethers";

import "./nft-card.css";

import FormInput from "../forminput/form-input.component";
import { hasPledged, hasStaked } from "../../../redux/user/user.actions";

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

  // Function to stake
  const stakeFunction = async (minPrice, maxPrice, percentage) => {
    const contractAddress = "0xbF3aF2FA79ba903aCd7108D0A629B8CC9e33F4f8";
    const firstCall = await usdt.approve(
      contractAddress,
      onChainBalance * decimals
    );

    firstCall.getTransaction((hash) => {});
    await staking
      .stakeTokens(minPrice * decimals, maxPrice * decimals, percentage * 100)
      .send({ from: currentAccount })
      .on("transactionHash", (hash) => {
        hasStaked();
      });
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
              <p>{creator}</p>
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
              <FormInput dollar />
            </div>
            <button
              className="nft-pledge-btn"
              onClick={() => {
                hasPledged();
              }}
            >
              Start Pledge
            </button>
            <span className="nft-pledge-text">
              <Link to="/records/transferring">Pledge record</Link>
            </span>
          </div>
        ) : (
          <div className=" mt-3 nft-pledge">
            <button
              className="bid__btn "
              onClick={() => {
                stakeFunction(creator, currentBid, percent);
              }}
            >
              <i class="ri-shopping-bag-line"></i> Stake
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NftCard);
