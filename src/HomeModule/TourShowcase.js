import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class TourShowcase extends Component {
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
            <div className="tour-showcase banner-2x">
                <div className="row">
                    <h3 className="f-weight-300">Book local experience tours and attractions with us</h3>
                    <h4 className="f-weight-300">Explore by category</h4>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="white-space">&nbsp;</div>
                        <div className="showcase-item">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/category1.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div className="white-space">&nbsp;</div>
                    </div>
                    <div className="col-lg-3">
                        <div className="showcase-item active">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/category2.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="showcase-item active">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/category3.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="white-space">&nbsp;</div>
                        <div className="showcase-item">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/category4.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div className="white-space">&nbsp;</div>
                    </div>
                </div>
                <div className="showcase-row-space"></div>
                <div className="row">
                    <h4 className="f-weight-300">Explore by mood</h4>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="white-space">&nbsp;</div>
                        <div className="showcase-item">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/mood1.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div className="white-space">&nbsp;</div>
                    </div>
                    <div className="col-lg-3">
                        <div className="showcase-item active">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/mood2.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="showcase-item active">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/mood3.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="white-space">&nbsp;</div>
                        <div className="showcase-item">
                            <div className="showcase-image" style={{backgroundImage: 'url(assets/images/mood4.png)'}}>
                                <div className="showcase-overlay"></div></div>
                            <div className="showcase-caption">
                                <div className="title">Attraction Tickets</div>
                                <div className="icon"><i className="fa fa-angle-right" aria-hidden="true"></i></div>
                            </div>
                        </div>
                        <div className="white-space">&nbsp;</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TourShowcase;