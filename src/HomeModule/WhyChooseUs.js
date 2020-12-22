import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class WhyChooseUs extends Component {
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
            <div className="product product-grid product-grid-2 car m-t-lg-90 p-t-sm-35 m-b-lg-20">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="product-item" style={{transition: 'none', 'WebkitTransition': 'none'}}>
                            <h1 className="text-justify">WHY</h1>
                            <h3 className="text-justify">CHOOSE US</h3>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="product-item box-styling">
                            <Link to={"#"} className="product-img">
                                <img src="assets/images/w1.jpg" alt="why choose us" />
                            </Link>	
                            <div className="product-caption">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </div>
                        </div>
                        <div className="product-item-caption text-center">No hidden charges</div>
                    </div>
                    <div className="col-lg-2">
                        <div className="product-item box-styling">
                            <Link to={"#"} className="product-img">
                                <img src="assets/images/w2.jpg" alt="why choose us" />
                            </Link>	
                            <div className="product-caption">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </div>
                        </div>
                        <div className="product-item-caption text-center">No hidden charges</div>
                    </div>
                    <div className="col-lg-2">
                        <div className="product-item box-styling">
                            <Link to={"#"} className="product-img">
                                <img src="assets/images/w1.jpg" alt="why choose us" />
                            </Link>	
                            <div className="product-caption">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </div>
                        </div>
                        <div className="product-item-caption text-center">No hidden charges</div>
                    </div>
                    <div className="col-lg-2">
                        <div className="product-item box-styling">
                            <Link to={"#"} className="product-img">
                                <img src="assets/images/w2.jpg" alt="why choose us" />
                            </Link>	
                            <div className="product-caption">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </div>
                        </div>
                        <div className="product-item-caption text-center">No hidden charges</div>
                    </div>
                    <div className="col-lg-2">
                        <div className="product-item box-styling">
                            <Link to={"#"} className="product-img">
                                <img src="assets/images/w1.jpg" alt="why choose us" />
                            </Link>	
                            <div className="product-caption">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </div>
                        </div>
                        <div className="product-item-caption text-center">No hidden charges</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WhyChooseUs;