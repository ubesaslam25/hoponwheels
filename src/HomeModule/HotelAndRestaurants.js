import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class HotelAndRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }
    
    componentWillMount() {
        
    }

    render() {
        //const { data, value } = this.state;
        return (
            <div className="highlight-list car m-t-lg-90 p-t-sm-35 m-b-lg-20">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="highlight-list-item heading">
                            <h1 className="text-justify">Hotel and restaurants with us</h1>
                            <button className="btn show-offer-btn">View all offers</button>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="highlight-list-item box-styling">
                            <Link to={"#"} className="highlight-list-img">
                                <img src="assets/images/hotel-1.png" alt="hotel and reataurant" />
                            </Link>	
                            <div className="highlight-list-caption">
                                <div className="title">Hotel Taj Palace</div>
                                <div className="price"><i className="fa fa-inr"></i> 3750/night</div>
                                <div className="ratings"><img src="assets/images/icons/tripadvisor.png" alt="hotel and reataurant" width="24" /> 3.5 stars</div>
                                <div className="clearfix"></div>
                                <div className="facility">
                                    <ul>
                                        <li><i className="fa fa-check available"></i> Wifi</li>
                                        <li><i className="fa fa-times not-available"></i> Breakfast</li>
                                    </ul>
                                </div>
                                <div className="action">
                                    <Link to={"#"}>Book Now</Link>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="highlight-list-item box-styling">
                            <Link to={"#"} className="highlight-list-img">
                                <img src="assets/images/hotel-2.png" alt="hotel and reataurant" />
                            </Link>	
                            <div className="highlight-list-caption">
                                <div className="title">Hotel Taj Palace</div>
                                <div className="price"><i className="fa fa-inr"></i> 3750/night</div>
                                <div className="ratings"><img src="assets/images/icons/tripadvisor.png" alt="hotel and reataurant" width="24" /> 3.5 stars</div>
                                <div className="clearfix"></div>
                                <div className="facility">
                                    <ul>
                                        <li><i className="fa fa-check available"></i> Wifi</li>
                                        <li><i className="fa fa-times not-available"></i> Breakfast</li>
                                    </ul>
                                </div>
                                <div className="action">
                                    <Link to={"#"}>Book Now</Link>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="highlight-list-item box-styling">
                            <Link to={"#"} className="highlight-list-img">
                                <img src="assets/images/hotel-3.png" alt="hotel and reataurant" />
                            </Link>	
                            <div className="highlight-list-caption">
                                <div className="title">Hotel Taj Palace</div>
                                <div className="price"><i className="fa fa-inr"></i> 3750/night</div>
                                <div className="ratings"><img src="assets/images/icons/tripadvisor.png" alt="hotel and reataurant" width="24" /> 3.5 stars</div>
                                <div className="clearfix"></div>
                                <div className="facility">
                                    <ul>
                                        <li><i className="fa fa-check available"></i> Wifi</li>
                                        <li><i className="fa fa-times not-available"></i> Breakfast</li>
                                    </ul>
                                </div>
                                <div className="action">
                                    <Link to={"#"}>Book Now</Link>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotelAndRestaurants;