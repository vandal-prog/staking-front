import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";

import FormInput from "../forminput/form-input.component";

const NftCard = ({ item, pledge }) => {
  const { title, id, currentBid, imgUrl, creator, percent } = item;

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
            <button className="nft-pledge-btn">Start Pledge</button>
            <span className="nft-pledge-text">
              <Link to="/records/transferring">Pledge record</Link>
            </span>
          </div>
        ) : (
          <div className=" mt-3 nft-pledge">
            <button className="bid__btn ">
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

export default NftCard;
