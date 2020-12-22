import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class MembershipBanner extends Component {
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
            <div className="membership-banner banner-item banner-2x banner-bg-9 color-inher">
                <div className="col-lg-6 pull-right text-box">
                    <h3>Become a premium member</h3>
                    <p>and get rewards everytime you drive with us.</p>
                    <div className="membership-box">
                        <div className="icon"><i className="fa fa-check-circle-o"></i></div>
                        <div className="text">Win loyalty points on every booking</div>
                    </div>
                    <div className="membership-box">
                        <div className="icon"><i className="fa fa-check-circle-o"></i></div>
                        <div className="text">Win loyalty points on every booking</div>
                    </div>
                    <div className="membership-box">
                        <div className="icon"><i className="fa fa-check-circle-o"></i></div>
                        <div className="text">Win loyalty points on every booking</div>
                    </div>
                    <div className="membership-box">
                        <div className="icon"><i className="fa fa-check-circle-o"></i></div>
                        <div className="text">Win loyalty points on every booking</div>
                    </div>
                    <div className="clearfix"></div>
                    <button className="btn show-offer-btn">Learn more</button>
                </div>
                <div className="claerfix"></div>
            </div>
        )
    }
}

export default MembershipBanner;