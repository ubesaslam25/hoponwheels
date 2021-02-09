import React, { Component } from 'react';
import Header from './Include/Header';
import FilterForm from './Include/FilterForm';
import ProductDetails from './OffersModule/ProductDetails.js';
import Footer from './Include/Footer';
import $ from "jquery";
import { Helmet } from "react-helmet";

class Details extends Component {
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
            <Helmet>
                <link rel="stylesheet" href="assets/css/custom/offers.css" />
                <script crossorigin src="assets/js/jquery/jquery-2.2.4.min.js"></script>
                <script crossorigin src="assets/js/jquery/jquery-ui.js"></script>
                <script crossorigin src="assets/js/bootstrap/bootstrap.min.js"></script>
                {/* <script crossorigin src="assets/js/magnific-popup/jquery.magnific-popup.min.js"></script> */}
                {/* <script crossorigin src="assets/js/jquery.counterup/waypoints.min.js"></script> */}
                {/* <script crossorigin src="assets/js/jquery.counterup/jquery.counterup.min.js"></script>
                <script crossorigin src="assets/js/owl-coursel/owl.carousel.js"></script> */}
                <script crossorigin src="assets/js/script.js"></script>
                {/* <script crossorigin src="assets/js/jquery.timepicker.min.js"></script>
                <script crossorigin src="assets/js/jquery.datetimepicker.full.min.js"></script> */}
                <script crossorigin src="assets/js/less.min.js"></script>
                {/* <script crossorigin src="assets/js/owl.carousel.min.js"></script> */}
                <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
                <script crossorigin src="assets/js/custom/offers.js"></script>
            </Helmet>
            <Header />
            <div id="wrap-body" className="p-t-lg-45">
                <div className="container">
                    <div className="wrap-body-inner">
                        <div className="dektopView"><FilterForm /></div>
                        <ProductDetails />
                    </div>
                </div>
            </div>
            <Footer />
      </div>
    );
  }
}

export default Details;