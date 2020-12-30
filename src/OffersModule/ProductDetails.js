import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Substring from 'react-substring';
import $ from "jquery";
//const domainUrl = "http://localhost/hoponwheels/";
const domainUrl = "http://yotour.in/hoponwheels/";
const apiUrl = "api/product/details/";
const imageUrl = "storage/app/images/";
const createBookingUrl = "api/bookings/create";
const addonsApiUrl = "api/addons";
const pickupApi = "api/location/pickup/";
const returnApi = "api/location/dropoff/";
const offersApiUrl = "api/products/offers/";
const allProducts = "api/products/";
const split = require('split-string');
//const navPath = '/reactapp/';
const navPath = '/';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            inclusion: [],
            addons: [],
            pickupRecords: [],
            returnRecords: [],
            postdata: JSON.parse(localStorage.getItem('result')),
            expectedKmValue: '',
            rentalPerDayVal: '',
            extraAddonsVal: '',
            searchOffers: [],
            pageName: JSON.parse(localStorage.getItem('pageName'))

        };
        //this.state.postdata = JSON.parse(localStorage.getItem('result'));
        this.submitBooking = this.submitBooking.bind(this);
    }
    
    async componentDidMount() {
        const that = this; 
        const urlSegment = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const offersPostData = this.state.postdata;
        const response = await fetch(domainUrl+apiUrl+urlSegment);
        const data = await response.json();
        that.setState({ records: data.data[0], inclusion: data.inclusion });

        fetch(domainUrl+addonsApiUrl)
        .then(res => res.json())
        .then(
            (result) => {
                that.setState({ addons: result });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )

        fetch(domainUrl+pickupApi+offersPostData['rental_area'])
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ pickupRecords: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
        )
        
		fetch(domainUrl+returnApi+offersPostData['rental_area'])
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ returnRecords: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
        
        if(this.state.pageName === 'offers'){
            fetch(domainUrl+offersApiUrl+offersPostData['rental_area'])
            .then(res => res.json())
            .then(
                (result) => {
                    that.setState({ searchOffers: result.data });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }else{
            fetch(domainUrl+offersApiUrl+allProducts)
            .then(res => res.json())
            .then(
                (result) => {
                    that.setState({ searchOffers: result });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    }

    submitBooking = (e) => {
        const that = this; 
        const offersPostData = this.state.postdata;
        var currentDate = new Date();
        var pickupLocationDate = new Date(offersPostData.pickup_location_date_time);
        var returnLocationDate = new Date(offersPostData.return_location_date_time);
        document.getElementById('customAlert').style.display = 'block';
        document.getElementById('boxoverlay').classList.add('dialogoverlay');
        var submitJsonData = {
            customer_id: 1, 
            user_id:1, 
            customer_location_id:1,
            pickup_id: offersPostData.pickup_location, 
            pickup_city_id: offersPostData.rental_area, 
            dropoff_id: offersPostData.return_location, 
            dropoff_city_id: offersPostData.rental_area,
            quantity:0,
            booking_date: currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds(), 
            rent_start_datetime: pickupLocationDate.getFullYear() + '-' + (pickupLocationDate.getMonth()+1) + '-' + pickupLocationDate.getDate() + ' ' + pickupLocationDate.getHours() + ':' + pickupLocationDate.getMinutes() + ':' + pickupLocationDate.getSeconds(), 
            rent_end_datetime: returnLocationDate.getFullYear() + '-' + (returnLocationDate.getMonth()+1) + '-' + returnLocationDate.getDate() + ' ' + returnLocationDate.getHours() + ':' + returnLocationDate.getMinutes() + ':' + returnLocationDate.getSeconds(), 
            sub_total:"", 
            coupen_id:0, 
            discount:0, 
            additional_amount:0, 
            reason_additional_amount:"", 
            tax_id:0, 
            tax_amount:0, 
            wallet_amount:"", 
            deduct_wallet_amount:"",
            net_total_amount: $("#final_total_amount").html(),
            payment_type:1, 
            payment_status:1, 
            booking_reject_time:"", 
            booking_reject_reason:"", 
            booking_cancel_time:"", 
            booking_cancel_reason:"", 
            actual_rent_start_time:"", 
            actual_rent_end_time:"", 
            extend_booking:"", 
            extend_booking_duration:"", 
            extend_booking_datetime:"", 
            extend_booking_reason:"", 
            extend_booking_charges:"", 
            extend_payment_type:"", 
            extend_payment_status:"", 
            status:1, 
            created_by:1, 
            updated_by:"", 
            product_addons_id:1, 
            is_addon:0, 
            vendor_vehicle_id:0, 
            product_quantity:1, 
            pricing_type:1, 
            price:$("#final_total_amount").html(),
            expected_kms:500, 
            booking_amount:$("#final_total_amount").html(),
            product_created_by:1, 
            product_updated_by:"" 
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({submitJsonData})
        };
        fetch(domainUrl+createBookingUrl, requestOptions)
		.then(res => res.json())
		.then(
			(result) => {
                console.log(result);
				that.setState({ bookingResponse: result.data });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
        );
    }

    handleExpectedKm = (e) => {
        const target = e;
        this.setState({expectedKmValue: target});
    }

    handleRentalPerDay = (e) => {
        const target = e;
        this.setState({rentalPerDayVal: target});
    }

    render() {
        var productId = this.state.records.id;
        var offersPostData = this.state.postdata;
        var carInclusions = this.state.inclusion;
        var carProductsAddons = this.state.addons;
        var carPickupRecords = this.state.pickupRecords;
        var carReturnRecords = this.state.returnRecords;
        var pickupLocationDate = new Date(offersPostData.pickup_location_date_time);
        var returnLocationDate = new Date(offersPostData.return_location_date_time);
        var monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var pickupLocationDateTime = pickupLocationDate.getDate() + ' ' + monthArray[pickupLocationDate.getMonth()] + ' ' + pickupLocationDate.getFullYear() + ' | ' + split(offersPostData.pickup_location_date_time.toString(),{ separator: ' ' })[1] + ' ' + split(offersPostData.pickup_location_date_time.toString(),{ separator: ' ' })[2];
        var returnLocationDateTime = returnLocationDate.getDate() + ' ' + monthArray[returnLocationDate.getMonth()] + ' ' + returnLocationDate.getFullYear() + ' | ' + split(offersPostData.return_location_date_time.toString(),{ separator: ' ' })[1] + ' ' + split(offersPostData.return_location_date_time.toString(),{ separator: ' ' })[2];
        var Difference_In_Time = returnLocationDate.getTime() - pickupLocationDate.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        var differenceInDays = ''; 
        if(split(Difference_In_Days.toString(),{ separator: '.' })[1]>0){
            differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1);
        }else{
            differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0]);
        }
        this.listingAddons = carProductsAddons.map(function(finalAddons, index){
            return <label key={ index } className="btn">
                <input type="checkbox" name='extras[]' id={'extra_addons'+index} defaultValue={finalAddons.price} /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>{finalAddons.name} </span> <div>Rs. {finalAddons.price}</div>
            </label>
        })
        this.listingData = this.state.searchOffers.map(function(finalData, index){
            return <div key={ index } className="col-lg-3">
                    <div className="products-item" /*data-toggle="modal" data-target={"#productDetailsSideBar"+index}*/ onClick={() => {window.location.replace(navPath+finalData.slug);}}>
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
        });
        this.listingcarinclusion = carInclusions.map(function(finalInc, index){
            return <li key={ index }>
                &nbsp;{(Number(productId) === Number(finalInc.product_id)) ? ((finalInc.title) ? finalInc.title : "") : ""}
            </li>
        });
        this.listingcarpickuprecords = carPickupRecords.map(function(finalPickup, index){
            return <li key={ index }>
                {(Number(offersPostData['pickup_location']) === Number(finalPickup.id)) ? finalPickup.location_name : ""}
            </li>
        });
        this.listingcarreturnrecords = carReturnRecords.map(function(finalReturn, index){
            return <li key={ index }>
                {(Number(offersPostData['return_location']) === Number(finalReturn.id)) ? finalReturn.location_name : ""}
            </li>
        })
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

                <div className="row product-vehicle-selection" id="productVehicleSelection">
                    {this.listingData}
                    <div className="modal right fade in" id={"productDetailsSideBar"} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel2" style={{display: 'block'}}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <button type="button" className="close" onClick={()=>{$("#productDetailsSideBar").css("display","none")}}><span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel2">{this.state.records.product_name}</h4>
                                    {(() => {
                                        switch (this.state.records.product_image_name) {
                                            case "":
                                                return <div className="products-image" style={{backgroundImage: 'url(assets/images/product1.png)'}}></div>;
                                            default:
                                                return <div className="products-image" style={{backgroundImage: 'url('+domainUrl+imageUrl+this.state.records.product_image_name+')'}}></div>;
                                        }
                                    })()}
                                    <ul className="accomodation">
                                        <li>{this.state.records.seater} seats</li>
                                        {(() => {
                                            switch (this.state.records.transmission) {
                                                case 1:
                                                    return <li>Manual</li>;
                                                case 0:
                                                    return <li>Automatic</li>
                                                default:
                                                    return <li></li>
                                            }
                                        })()}
                                        {(() => {
                                            switch (this.state.records.ac) {
                                                case "":
                                                    return <li></li>;
                                                case "0":
                                                    return <li></li>
                                                default:
                                                    return <li>Air Conditioner</li>
                                            }
                                        })()}
                                        {(() => {
                                            switch (this.state.records.airbags_available) {
                                                case "1":
                                                    return <li>{this.state.records.no_of_air_bags} Airbags available</li>;
                                                case "0":
                                                    return <li>Airbags not available</li>
                                                default:
                                                    return <li></li>
                                            }
                                        })()}
                                    </ul>
                                    <div className="clearfix"></div>
                                    <div className="price">
                                        <ul>
                                            <li>
                                                <label style={{float: 'left'}}><input type="radio" name="rental_per_day" defaultChecked onClick={(e) => {document.getElementById('rental_per_day_box').style.display = 'block';document.getElementById('rental_per_day_km').style.display = 'none';this.handleRentalPerDay(e.target.value)}} defaultValue={1} /> Per day</label>
                                                <label><input type="radio" name="rental_per_day" onClick={(e) => {document.getElementById('rental_per_day_box').style.display = 'none';document.getElementById('rental_per_day_km').style.display = 'block';this.handleRentalPerDay(e.target.value)}} defaultValue={2} /> Per km</label>
                                                <div className="clearfix"></div>
                                                <input type="hidden" id="rental_per_day_val" defaultValue={this.state.rentalPerDayVal ? this.state.rentalPerDayVal : 1} />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="price">
                                        <ul id={"rental_per_day_box"}>
                                            <li>
                                                <span className="pull-left">Rental per day</span>
                                                <span className="pull-right">Rs. {this.state.records.price_per_day}</span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left">Rental period</span>
                                                <span className="pull-right">{differenceInDays} days</span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left text-uppercase">Total</span>
                                                <span className="pull-right" style={{textAlign: 'end'}}>Rs. <b id="rental_per_day_total">{this.state.records.price_per_day*differenceInDays}</b><br /><small>(Tax included)</small></span>
                                                <div className="clearfix"></div>
                                            </li>
                                        </ul>
                                        <ul id={"rental_per_day_km"} style={{display: 'none'}}>
                                            <li>
                                                <span className="pull-left">Rental per km</span>
                                                <span className="pull-right">Rs. {this.state.records.price_per_km_after_cutoff}</span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left">Cutoff Km</span>
                                                <span className="pull-right">{this.state.records.cut_off_kms}</span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left">Minimum Price</span>
                                                <span className="pull-right">Rs. {this.state.records.price}</span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left">Expected Km</span>
                                                <span className="pull-right" style={{width: '50%'}}><input type="number" defaultValue={this.state.records.cut_off_kms} onChange={(e) => {this.handleExpectedKm(e.target.value)}} style={{width: '100%'}} /></span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left text-uppercase">Total</span>
                                                <span className="pull-right" style={{textAlign: 'end'}}>
                                                    Rs.&nbsp;
                                                    <b id="rental_per_km_total">{
                                                        this.state.expectedKmValue > this.state.records.cut_off_kms ? Number( this.state.records.price
                                                            )+(Number( this.state.expectedKmValue
                                                            )-Number( this.state.records.cut_off_kms
                                                            ))*Number( this.state.records.price_per_km_after_cutoff
                                                            ) : Number( this.state.records.price
                                                                )
                                                    }</b>
                                                <br /><small>(Tax included)</small></span>
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
                                        <button className="btn show-offer-btn" data-dismiss="modal" aria-label="Close" onClick={() => {document.getElementById('productProtectionExtras').style.display = 'block';document.getElementById('productVehicleSelection').style.display = 'none';}}>Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row product-protection-extras" id={"productProtectionExtras"} style={{display: 'none'}}>
                    <div className="col-lg-12">
                        <h4>{this.state.records.product_name}</h4>
                    </div>
                    <div className="col-lg-4">
                        {(() => {
                            switch (this.state.records.product_image_name) {
                                case "":
                                    return <div className="products-image" style={{backgroundImage: 'url(assets/images/product1.png)'}}></div>;
                                default:
                                    return <div className="products-image" style={{backgroundImage: 'url('+domainUrl+imageUrl+this.state.records.product_image_name+')'}}></div>;
                            }
                        })()}
                    </div>
                    <div className="col-lg-3">
                        <h5>Your offer includes</h5>
                        <ul>
                            {this.listingcarinclusion}
                        </ul>
                    </div>
                    <div className="col-lg-5">
                        <h5>Choose your extras</h5>
                        <div className="btn-group btn-group-vertical" data-toggle="buttons">
                            {this.listingAddons}
                            {/* <label className="btn active">
                                <input type="checkbox" name='extras' defaultChecked /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i> <span> Protect your rental </span>
                            </label>
                            <label className="btn">
                                <input type="checkbox" name='extras' /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>Prepaid fuel </span> <div>Rs. 850</div>
                            </label> */}
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="total">Total</div>
                                            <div className="tax">(Tax included) </div>
                                        </td>
                                        <td>
                                            <div className="total-amount">Rs.&nbsp;
                                                <b id="extra_addons_total">{(Number($('#rental_per_day_val').val()) === Number(1)) ? Number($('#rental_per_day_total').html()) : Number(this.state.expectedKmValue > this.state.records.cut_off_kms ? Number( this.state.records.price
                                                            )+(Number( this.state.expectedKmValue
                                                            )-Number( this.state.records.cut_off_kms
                                                            ))*Number( this.state.records.price_per_km_after_cutoff
                                                            ) : Number( this.state.records.price
                                                                ))}</b>
                                            </div>
                                            {/* <div className="view-detail"><Link to={"#"}>View details</Link></div> */}
                                        </td>
                                        <td>
                                            <button className="btn show-offer-btn" onClick={() => {document.getElementById('productProtectionExtras').style.display = 'none';document.getElementById('productDriverDetails').style.display = 'block'}}>Continue</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row product-driver-details" id={"productDriverDetails"} style={{'display': 'none'}}>
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
                            {(() => {
                                switch (this.state.records.product_image_name) {
                                    case "":
                                        return <div className="products-image" style={{backgroundImage: 'url(assets/images/product1.png)'}}></div>;
                                    default:
                                        return <div className="products-image" style={{backgroundImage: 'url('+domainUrl+imageUrl+this.state.records.product_image_name+')'}}></div>;
                                }
                            })()}
                        </div>
                        <div className="col-lg-8">
                            <h6>{this.state.records.product_name}</h6>
                            <ul>
                                <li>Pick up</li>
                                <li>Return</li>
                                {this.listingcarpickuprecords}
                                {this.listingcarreturnrecords}
                                <li>{pickupLocationDateTime}</li>
                                <li>{returnLocationDateTime}</li>
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-lg-4">
                            <b>Cancellation Policy:</b>
                            <ul>
                                <li>{(this.state.records.cancellation_policy !== null) ? this.state.records.cancellation_policy_description : ""}</li>
                            </ul>
                        </div>
                        <div className="col-lg-5">
                            <b>Late Return Policy:</b>
                            <ul>
                                <li>{(this.state.records.late_return_policy !== null) ? this.state.records.late_return_policy_description : ""}</li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <b>Damage Policy:</b>
                            <ul>
                                <li>{(this.state.records.damage_policy !== null) ? this.state.records.damage_policy_description : ""}</li>
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
                                            <div className="total-amount" id="final_total_amount">Rs. {
                                                        this.state.expectedKmValue > this.state.records.cut_off_kms ? Number( this.state.records.price
                                                            )+(Number( this.state.expectedKmValue
                                                            )-Number( this.state.records.cut_off_kms
                                                            ))*Number( this.state.records.price_per_km_after_cutoff
                                                            ) : Number( this.state.records.price
                                                                )
                                                    }</div>
                                            {/* <div className="view-detail"><Link to={"#"}>View details</Link></div> */}
                                        </td>
                                        <td>
                                            <button className="btn show-offer-btn book-now-btn" onClick={e => {this.submitBooking(e)}}>Book &amp; Pay</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='customAlert' id="customAlert">
                    <img src="assets/images/icons/check-white.svg" alt="" />
                    <p>Your rental car is booked</p>
                    <p><Link to={"#"}><i className="fa fa-download"></i> Download receipt</Link></p>
                    <button className="btn show-offer-btn confirmButton" onClick={()=>{window.location.replace(navPath)}}>Done</button>
                </div>
                <div className="boxoverlay" id="boxoverlay"></div>

            </div> 
        )
    }
}

export default ProductDetails;