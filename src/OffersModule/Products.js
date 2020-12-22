import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
const domainUrl = "http://localhost/hoponwheels/";
//const domainUrl = "http://yotour.in/hoponwheels/";
const apiUrl = "api/products/offers/";
const imageUrl = "storage/app/images/";
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            inclusion: []
        };
        this.state.postdata = JSON.parse(localStorage.getItem('result'));
        console.log(this.state.postdata);
    }
    
    async componentDidMount() {
        const that = this; 
        const offersPostData = this.state.postdata;
        const response = await fetch(domainUrl+apiUrl+offersPostData[0]);
        const data = await response.json();
        //if(data.data.length > 1){
            that.setState({ records: data.data, inclusion: data.inclusion });
        //}
        // if(data.inclusion > 1){
        //     that.setState({ inclusion: data.inclusion });
        // }
    }

    render() {
        this.listingDataCount = this.state.records.length;
        this.listingDataVehicleType = this.state.records.map(function(finalData, index){
            return <option key={ index } value={finalData.vehicle_type}>{finalData.vehicle_type}</option>
        });
        this.listingData = this.state.records.map(function(finalData, index){
            return <div key={ index }>
                <div className="col-lg-3">
                    <div className="products-item" data-toggle="modal" data-target={"#productDetailsSideBar"+index}>
                        {(() => {
                            switch (finalData.product_image_name) {
                                case "":
                                    return <div className="products-image" style={{backgroundImage: 'url(assets/images/product1.png)'}}></div>;
                                default:
                                    return <div className="products-image" style={{backgroundImage: 'url('+domainUrl+imageUrl+finalData.product_image_name+')'}}></div>;
                            }
                        })()}
                        <div className="products-caption">
                            {/* <div className="sticker" style={{backgroundImage: 'url(assets/images/product-sticker.png)'}}></div> */}
                            <div className="title">{finalData.product_name}</div>
                            <div className="price">Prices starting from: <span><i className="fa fa-inr"></i>{finalData.price_per_day}</span> per day</div>
                        </div>
                    </div>
                </div>
                <div className="modal right fade in" id={"productDetailsSideBar"+index} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel2">{finalData.product_name}</h4>
                                {(() => {
                                    switch (finalData.product_image_name) {
                                        case "":
                                            return <div className="products-image" style={{backgroundImage: 'url(assets/images/product1.png)'}}></div>;
                                        default:
                                            return <div className="products-image" style={{backgroundImage: 'url('+domainUrl+imageUrl+finalData.product_image_name+')'}}></div>;
                                    }
                                })()}
                                <ul className="accomodation">
                                    <li>{finalData.seater} seats</li>
                                    <li>Roof-top storage</li>
                                    {(() => {
                                        switch (finalData.ac) {
                                            case "":
                                                return <li>-</li>;
                                            case "0":
                                                return <li>-</li>
                                            default:
                                                return <li>Air Conditioner</li>
                                        }
                                    })()}
                                    <li>4 years on the run</li>
                                </ul>
                                <div className="clearfix"></div>
                                <div className="price">
                                    <ul>
                                        <li>
                                            <span className="pull-left">Rental per day</span>
                                            <span className="pull-right">Rs. {finalData.price_per_day}</span>
                                            <div className="clearfix"></div>
                                        </li>
                                        <li>
                                            <span className="pull-left">Rental period</span>
                                            <span className="pull-right">2 days</span>
                                            <div className="clearfix"></div>
                                        </li>
                                        <li>
                                            <span className="pull-left text-uppercase">Total</span>
                                            <span className="pull-right" style={{textAlign: 'end'}}>Rs. 7200<br /><small>(Tax included)</small></span>
                                            <div className="clearfix"></div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="clearfix"></div>
                                <div className="payment">
                                    <div className="btn-group btn-group-vertical" data-toggle="buttons">
                                        <label className="btn active">
                                            <input type="radio" name='payment' defaultChecked /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Pay online </span> <span>(money saver)</span>
                                        </label>
                                        <label className="btn">
                                            <input type="radio" name='payment' /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Pay later </span> <span>(Flexible rebooking)</span>
                                        </label>
                                    </div>
                                    <button className="btn show-offer-btn" data-dismiss="modal" aria-label="Close">Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        });
        this.listingInc = this.state.inclusion.map(function(finalInc, index){
            return <li key={ index }>{finalInc.title}</li>
        });
        this.listingExtra = this.state.records.map(function(finalData, index){
            return <div key={ index } className="row product-protection-extras" id={"productProtectionExtras"+index}>
                <div className="col-lg-12">
                    <h4>{finalData.product_name}</h4>
                </div>
                <div className="col-lg-4">
                    {(() => {
                        switch (finalData.product_image_name) {
                            case "":
                                return <div className="products-image" style={{backgroundImage: 'url(assets/images/product1.png)'}}></div>;
                            default:
                                return <div className="products-image" style={{backgroundImage: 'url('+domainUrl+imageUrl+finalData.product_image_name+')'}}></div>;
                        }
                    })()}
                </div>
                <div className="col-lg-3">
                    <h5>Your offer includes</h5>
                    <ul>
                        
                    </ul>
                </div>
                <div className="col-lg-5">
                    <h5>Choose your extras</h5>
                    <div className="btn-group btn-group-vertical" data-toggle="buttons">
                        <label className="btn active">
                            <input type="checkbox" name='extras' defaultChecked /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i> <span> Protect your rental </span>
                        </label>
                        <label className="btn">
                            <input type="checkbox" name='extras' /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>Prepaid fuel </span> <div>Rs. 850</div>
                        </label>
                        <label className="btn">
                            <input type="checkbox" name='extras' /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>GPS guranteed </span> <div>Rs. 35 per day</div>
                        </label>
                        <label className="btn">
                            <input type="checkbox" name='extras' /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>Diesel preferred </span> <div>Rs. 35 per day</div>
                        </label>
                        <label className="btn">
                            <input type="checkbox" name='extras' /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>Additional driver </span> <div>Rs. 35 per day</div>
                        </label>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="total">Total</div>
                                        <div className="tax">(Tax included)</div>
                                    </td>
                                    <td>
                                        <div className="total-amount">Rs. 7200</div>
                                        <div className="view-detail"><Link to={"#"}>View details</Link></div>
                                    </td>
                                    <td>
                                        <button className="btn show-offer-btn">Continue</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        });
        return (
            <div className="products products-grid products-grid-2 banner-2x">
                <div className="row">
                    <div id="msform">
                        <ul id="progressbar">
                            <li className="bar-list active"><span>Vehicle Selection</span></li>
                            <li className="bar-details"><span>Protection &amp; Extras</span></li>
                            <li><span>Driver Details</span></li>
                        </ul>
                    </div>
                </div>

                <div className="row product-filter-bar">
                    <div className="col-lg-2">
                        <h3>{this.listingDataCount} Offers</h3>
                    </div>
                    <div className="col-lg-2">
                        <select>
                            <option>Vehicle type</option>
                            {this.listingDataVehicleType}
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <select>
                            <option>No. of seats: 2</option>
                        </select>
                    </div>
                    <div className="col-lg-6">
                        <select>
                            <option>Lowest Price First</option>
                        </select>
                    </div>
                </div>

                <div className="row product-vehicle-selection">
                    {this.listingData}
                </div>
                
                <div>{this.listingExtra}</div>

                <div className="row product-driver-details" style={{'display': 'none'}}>
                    <div className="col-lg-7">
                        <h5>Personal Details</h5>
                        <form method="post" action="#">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="form-inline">
                                        <div className="btn-group btn-group-vertical" data-toggle="buttons">
                                            <label className="btn active">
                                            <input type="radio" name="driver_pre_name" defaultChecked /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Mr. </span>
                                            </label>
                                            <label className="btn">
                                            <input type="radio" name="driver_pre_name" /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Ms.</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>First name</label>
                                    <input type="text" name="" />
                                </div>
                                <div className="form-group">
                                    <label>Last name</label>
                                    <input type="text" name="" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="" />
                                </div>
                                <div className="form-group mobile">
                                    <label>Mobile</label>
                                    <select name="">
                                        <option value="">+91</option>
                                        <option value="">+88</option>
                                    </select>
                                    <input type="text" name="" />
                                </div>
                                <div className="form-group dob">
                                    <label>Mobile</label>
                                    <input type="text" name="dob_date" placeholder="DD" />
                                    <input type="text" name="dob_month" placeholder="MM" />
                                    <input type="text" name="dob_year" placeholder="YYYY" />
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" name="" />
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>City</label>
                                        <select name="">
                                            <option value="">Bangaluru</option>
                                            <option value="">Bhopal</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6" style={{paddingLeft: '15px !important'}}>
                                    <div className="form-group">
                                        <label>State</label>
                                        <select name="">
                                            <option value="">Karnataka</option>
                                            <option value="">Madhya Pradesh</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <select name="">
                                            <option value="">India</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6" style={{paddingLeft: '15px !important'}}>
                                    <div className="form-group">
                                        <label>ZIP</label>
                                        <input type="text" name="" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-5">
                        <h5>Reviews &amp; Book</h5>
                        <div className="col-lg-4">
                            <div className="products-image" style={{backgroundImage: 'url(images/product1.png)'}}></div>
                        </div>
                        <div className="col-lg-8">
                            <h6>Maruti Suzuki Wagon R</h6>
                            <ul>
                                <li>Pick up</li>
                                <li>Return</li>
                                <li>CST Railway Station</li>
                                <li>Powai Lake</li>
                                <li>23 Jul 2020 | 12:00 PM</li>
                                <li>24 Jul 2020 | 06:00 PM</li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-lg-4">
                            <b>Protection and extras:</b>
                            <ul>
                                <li>Third party insurance</li>
                                <li>Unlimited kilometers</li>
                                <li>+2 more <Link to={""}>View</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <b>Driver Requirements:</b>
                            <ul>
                                <li>At least 21 years old of age</li>
                                <li>At least 2 years of driving license</li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <b>Payment Mode:</b>
                            <ul>
                                <li>Online</li>
                                <li><Link to={""}>Change</Link></li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="total">Total</div>
                                            <div className="tax">(Tax included)</div>
                                        </td>
                                        <td>
                                            <div className="total-amount">Rs. 7200</div>
                                            <div className="view-detail"><Link to={"#"}>View details</Link></div>
                                        </td>
                                        <td>
                                            <button className="btn show-offer-btn book-now-btn">Book &amp; Pay</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='customAlert'>
                    <img src="assets/images/icons/check-white.svg" alt="" />
                    <p>Your rental car is booked</p>
                    <p><Link to={""}><i className="fa fa-download"></i> Download receipt</Link></p>
                    <button className="btn show-offer-btn confirmButton">Done</button>
                </div>
                <div className="boxoverlay"></div>
            </div> 
        )
    }
}

export default Products;