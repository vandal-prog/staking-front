import React,{useEffect} from "react";
import { connect } from "react-redux";


import HeroSection from "../components/ui/HeroSection";

import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";

import About from "../components/ui/aboutp/About";

import Trending from "../components/ui/Trending-section/Trending";

import Calculator from "../components/ui/calculator/calculator.component";
import StepSection from "../components/ui/Step-section/StepSection";
import { useParams } from "react-router-dom";
import {
  setReferralAddress,
} from "../redux/user/user.actions";


const Home = ({
  setReferralAddress,
  Theuseraddress,
  Myreferral
}) => {

  let { referral_id } = useParams();


  const checkIfReferralExistsInUrl = () => {

    if(referral_id){

      if( Theuseraddress === referral_id ){
        alert("You cant refer your self")
      }else{

        if( Myreferral ){
          alert("You ve been referred by someone else")
        }else{
          setReferralAddress(referral_id)
        }
      }
    }else{
      return
    }

  }
  

  useEffect( () => {

    checkIfReferralExistsInUrl()

  }, [referral_id] )


  return (
    <>
      <HeroSection />
      <SellerSection />
      <About />
      <LiveAuction />
      <Trending />
      <Calculator />
      <StepSection />
      {/* <Outlet/> */}

    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setReferralAddress: (address) => dispatch(setReferralAddress(address)),
});

const mapStateToProps = (state) => ({
  Theuseraddress: state.account.currentAccount,
  Myreferral: state.referral.ReferralAddress,
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
