import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class AdvertisementBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }
    
    componentDidMount() {
        
    }

    render() {
        //const { data, value } = this.state;
        return (
            <div className="mobile-app-ads banner-item banner-2x banner-bg-9 color-inher">
                <div className="col-lg-6 pull-right text-box">
                    <h3>At your finger-tips</h3>
                    <p>Make a booking, unlock your car, and end your booking, all from our mobile app.</p>
                    <p>Get <i className="fa fa-inr"></i>500 off on the first booking through mobile app.</p>
                    <p>Get it on</p>
                    <button className="btn show-offer-btn"><i className="fa fa-play"></i> Google Play</button>
                    <div className="clearfix"></div>
                    <button className="btn show-offer-btn"><i className="fa fa-apple"></i> App Store</button>
                </div>
                <div className="claerfix"></div>
            </div>
        )
    }
}

export default AdvertisementBanner;