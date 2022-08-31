import React,{useEffect, useState} from "react";
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
  setReferralLink
} from "../redux/user/user.actions";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';


const Home = ({
  setReferralAddress,
  Theuseraddress,
  TheuserreferallLink,
  setReferralLink,
  Myreferral
}) => {


  const [ UserLink, setUserLink ] = useState(`192.168.43.223:3000/home/${Theuseraddress}`)
  const [ shortenedUserLink, setshortenedUserLink ] = useState()

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

  const UserReferalLinkFunction = () => {

    if ( TheuserreferallLink ) {
      setshortenedUserLink(TheuserreferallLink)
    }else{
      axios.get('https://api.shrtco.de/v2/shorten?url='+ UserLink ).then(
        response => {
          console.log(response)
          setshortenedUserLink(response.data.result.full_short_link);
          setReferralLink(response.data.result.full_short_link)
        }
      ).catch( (e) => {
  
        console.log(e)
  
      } )
    }
  };

  useEffect( () => {

    checkIfReferralExistsInUrl()
    UserReferalLinkFunction()

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

      <div>
        {UserLink}
      </div>


      <CopyToClipboard text={shortenedUserLink}>
        <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
          Copy URL to Clipboard
        </button>
      </CopyToClipboard>

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
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
