import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class OfferSlider extends Component {
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
            <div className="tcb-bs-fullscreen">
                <div id="myCarousel" className="carousel slide carousel-bg" data-ride="carousel">
                    <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                
                    <div className="carousel-inner" role="listbox">
                        <div className="item active" style={{backgroundImage: 'url(assets/images/slider.png)'}}>
                            <div className="carousel-caption">
                                <h6>Planning for a long-term rental?</h6>
                                <Link to={"#"} className="btn btn-default"><span>15%</span><br />OFF</Link>
                                <Link to={"#"} className="btn btn-default"><span>Unlimited</span><br />miles</Link>
                                <div className="caption-action-btn"><button className="btn show-offer-btn text-uppercase">Check Offers</button></div>
                            </div>
                        </div>
                    
                        <div className="item" style={{backgroundImage: 'url(assets/images/slider.png)'}}>
                            <div className="carousel-caption">
                                <h6>Planning for a long-term rental?</h6>
                                <Link to={"#"} className="btn btn-default"><span>15%</span><br />OFF</Link>
                                <Link to={"#"} className="btn btn-default"><span>Unlimited</span><br />miles</Link>
                                <div className="caption-action-btn"><button className="btn show-offer-btn text-uppercase">Check Offers</button></div>
                            </div>
                        </div>
                        
                        <div className="item" style={{backgroundImage: 'url(assets/images/slider.png)'}}>
                            <div className="carousel-caption">
                                <h6>Planning for a long-term rental?</h6>
                                <Link to={"#"} className="btn btn-default"><span>15%</span><br />OFF</Link>
                                <Link to={"#"} className="btn btn-default"><span>Unlimited</span><br />miles</Link>
                                <div className="caption-action-btn"><button className="btn show-offer-btn text-uppercase">Check Offers</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OfferSlider;