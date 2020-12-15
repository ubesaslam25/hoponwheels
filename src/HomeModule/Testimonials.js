import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class Testimonials extends Component {
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
            <section className="testimonials">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2 className="section-title">What Our Customers Say About Us</h2>
                            <div id="customers-testimonials" className="owl-carousel">
                                <div className="item">
                                    <div className="shadow-effect">
                                        <p>Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate.</p>
                                        <img className="img-circle" src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-name">
                                        <div className="testimonial-star">
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="testimonial-customer-name">David Miler</div>
                                        <div className="testimonial-customer-type">Customer</div>
                                        <hr />
                                    </div>
                                </div>
                                
                                <div className="item">
                                    <div className="shadow-effect">
                                        <p>Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate.</p>
                                        <img className="img-circle" src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-name">
                                        <div className="testimonial-star">
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="testimonial-customer-name">David Miler</div>
                                        <div className="testimonial-customer-type">Customer</div>
                                        <hr />
                                    </div>
                                </div>
                                
                                <div className="item">
                                    <div className="shadow-effect">
                                        <p>Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate.</p>
                                        <img className="img-circle" src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-name">
                                        <div className="testimonial-star">
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="testimonial-customer-name">David Miler</div>
                                        <div className="testimonial-customer-type">Customer</div>
                                        <hr />
                                    </div>
                                </div>
                                
                                <div className="item">
                                    <div className="shadow-effect">
                                        <p>Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate.</p>
                                        <img className="img-circle" src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-name">
                                        <div className="testimonial-star">
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="testimonial-customer-name">David Miler</div>
                                        <div className="testimonial-customer-type">Customer</div>
                                        <hr />
                                    </div>
                                </div>
                                
                                <div className="item">
                                    <div className="shadow-effect">
                                        <p>Dramatically maintain clicks-and-mortar solutions without functional solutions. Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate.</p>
                                        <img className="img-circle" src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg" alt="" />
                                    </div>
                                    <div className="testimonial-name">
                                        <div className="testimonial-star">
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star active"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="testimonial-customer-name">David Miler</div>
                                        <div className="testimonial-customer-type">Customer</div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Testimonials;