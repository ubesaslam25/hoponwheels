import React, { Component } from 'react';
import Header from './Include/Header';
import FilterForm from './Include/FilterForm';
import BannerContent from './HomeModule/BannerContent';
import WhyChooseUs from './HomeModule/WhyChooseUs';
import OfferSlider from './HomeModule/OfferSlider';
import Products from './HomeModule/Products';
import AdvertisementBanner from './HomeModule/AdvertisementBanner';
import Testimonials from './HomeModule/Testimonials';
import TourShowcase from './HomeModule/TourShowcase';
import MembershipBanner from './HomeModule/MembershipBanner';
import HotelAndRestaurants from './HomeModule/HotelAndRestaurants';
import SocialNetwork from './HomeModule/SocialNetwork';
import OurBusiness from './HomeModule/OurBusiness';
import OurLocation from './HomeModule/OurLocation';
import OurPartners from './HomeModule/OurPartners';
import Footer from './Include/Footer';
import $ from "jquery";
import { Helmet } from "react-helmet";
//import { Loader } from "react-full-page-loader-overlay";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };
  }

  onBackButtonEvent(event) {
    event.preventDefault();
    // the user shouldn’t be able to move backward or forward
  }
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function(event) { 
        $('.preloader p').fadeOut();
        $('.preloader').delay(500).fadeOut('slow');
        $('body').delay(600).css({'overflow':'visible'});
    });
    window.onpopstate = this.onBackButtonEvent;
  }

  render() {
    //const { data, value } = this.state;
    return (
      <div>
          {/* <Loader show={true} fillIn={false} /> */}
          <Helmet>
            <link rel="stylesheet" href="assets/css/custom/index.css" />
            <script crossorigin src="assets/js/jquery/jquery-2.2.4.min.js"></script>
            <script crossorigin src="assets/js/jquery/jquery-ui.js"></script>
            <script crossorigin src="assets/js/bootstrap/bootstrap.min.js"></script>
            {/* <script crossorigin src="assets/js/magnific-popup/jquery.magnific-popup.min.js"></script> */}
            {/* <script crossorigin src="assets/js/jquery.counterup/waypoints.min.js"></script> */}
            <script crossorigin src="assets/js/jquery.counterup/jquery.counterup.min.js"></script>
            <script crossorigin src="assets/js/owl-coursel/owl.carousel.js"></script>
            <script crossorigin src="assets/js/script.js"></script>
            {/* <script crossorigin src="assets/js/jquery.timepicker.min.js"></script>
            <script crossorigin src="assets/js/jquery.datetimepicker.full.min.js"></script> */}
            <script crossorigin src="assets/js/less.min.js"></script>
            {/* <script crossorigin src="assets/js/owl.carousel.min.js"></script> */}
            <script crossorigin src="assets/js/custom/index.js"></script>
          </Helmet>
          <Header />
          <div className="dektopView"><FilterForm /></div>
          <BannerContent />
          <div id="wrap-body" className="p-t-lg-45">
				    <div className="container">
					    <div className="wrap-body-inner">
                <WhyChooseUs />
                <OfferSlider />
                <Products />
                <AdvertisementBanner />
                <Testimonials />
                <TourShowcase />
                <MembershipBanner />
                <HotelAndRestaurants />
                <SocialNetwork />
                <OurBusiness />
                <OurLocation />
                <OurPartners />
              </div>
            </div>
          </div>
          <Footer />
      </div>
    );
  }
}

export default Home;