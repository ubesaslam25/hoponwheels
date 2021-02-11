import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Substring from 'react-substring';
import $ from "jquery";
import CurrencyFormat from 'react-currency-format';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
const cityApi = "api/city";
const stateApi = "api/state";
const countryApi = "api/country";
const essentialsApi = "api/essentials";
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
            rentalPerDayVal: 4,
            extraAddonsVal: 0,
            extraAddonsArray: [],
            searchOffers: [],
            pageName: JSON.parse(localStorage.getItem('pageName')),
            activeProductStyle: '',
            cityList: [],
            stateList: [],
            countryList: [],
            differenceInDays: '',
            essentials: [],
            essentialsChecked: [],
            essentialsCheckedSum: 0,
            addonsChecked: [],
            addonsCheckedSum: 0
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
        
		fetch(domainUrl+cityApi)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ cityList: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
        )
        
		fetch(domainUrl+stateApi)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ stateList: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
        )
        
		fetch(domainUrl+countryApi)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ countryList: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
        )

        fetch(domainUrl+essentialsApi)
        .then(res => res.json())
        .then(
            (result) => {
                that.setState({ essentials: result });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
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
            body: JSON.stringify(submitJsonData)
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

    handleSelectOffers = (e) => {
        // console.log(e.target);
        if(e.target.checked === true){
            this.state.essentialsCheckedSum = this.state.essentialsCheckedSum + Number(e.target.value);
        }else{
            this.state.essentialsCheckedSum = this.state.essentialsCheckedSum - Number(e.target.value);
        }     
        var offersPostData = this.state.postdata;
        var pickupLocationDate = new Date(offersPostData.pickup_location_date_time);
        var returnLocationDate = new Date(offersPostData.return_location_date_time);
        var Difference_In_Time = returnLocationDate.getTime() - pickupLocationDate.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //var differenceInDays = ''; 
        if(split(Difference_In_Days.toString(),{ separator: '.' })[1]>0){
            this.setState({differenceInDays: Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1)});
            //this.state.differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1);
        }else{
            this.setState({differenceInDays: Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])});
            //this.state.differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0]);
        }
        if(Number(this.state.rentalPerDayVal) === 1){
            $('#extra_addons_total_1 span, #extra_addons_total_2').html('Rs. '+((Number(this.state.records.price)+(Number(this.state.expectedKmValue)-Number(this.state.records.cut_off_kms))*Number(this.state.records.price_per_km_after_cutoff))+Number(this.state.essentialsCheckedSum)));
        }else if(Number(this.state.rentalPerDayVal) === 2){
            $('#extra_addons_total_1 span, #extra_addons_total_2').html('Rs. '+(Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)));
        }else if(Number(this.state.rentalPerDayVal) === 3){
            $('#extra_addons_total_1 span, #extra_addons_total_2').html('Rs. '+(Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)));
        }else if(Number(this.state.rentalPerDayVal) === 4){
            $('#extra_addons_total_1 span, #extra_addons_total_2').html('Rs. '+(Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)));
        }
    }

    handleListingAddons = (e) => {
        if(e.target.checked === true){
            this.state.addonsCheckedSum = this.state.addonsCheckedSum + Number(e.target.value);
        }else{
            this.state.addonsCheckedSum = this.state.addonsCheckedSum - Number(e.target.value);
        }      
        //console.log(this.state.addonsCheckedSum);
        var offersPostData = this.state.postdata;
        var pickupLocationDate = new Date(offersPostData.pickup_location_date_time);
        var returnLocationDate = new Date(offersPostData.return_location_date_time);
        var Difference_In_Time = returnLocationDate.getTime() - pickupLocationDate.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //var differenceInDays = ''; 
        if(split(Difference_In_Days.toString(),{ separator: '.' })[1]>0){
            this.setState({differenceInDays:  Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1)});
            //this.state.differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1);
        }else{
            this.setState({differenceInDays: Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])});
            //this.state.differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0]);
        }
        if(Number(this.state.rentalPerDayVal) === 1){
            $('#extra_addons_total_2, #extra_addons_total_3, #final_total_amount').html('Rs. '+((Number(this.state.records.price)+(Number(this.state.expectedKmValue)-Number(this.state.records.cut_off_kms))*Number(this.state.records.price_per_km_after_cutoff))+Number(this.state.essentialsCheckedSum)+Number(this.state.addonsCheckedSum)));
        }else if(Number(this.state.rentalPerDayVal) === 2){
            $('#extra_addons_total_2, #extra_addons_total_3, #final_total_amount').html('Rs. '+(Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)+Number(this.state.addonsCheckedSum)));
        }else if(Number(this.state.rentalPerDayVal) === 3){
            $('#extra_addons_total_2, #extra_addons_total_3, #final_total_amount').html('Rs. '+(Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)+Number(this.state.addonsCheckedSum)));
        }else if(Number(this.state.rentalPerDayVal) === 4){
            $('#extra_addons_total_2, #extra_addons_total_3, #final_total_amount').html('Rs. '+(Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)+Number(this.state.addonsCheckedSum)));
        }
    }

    quantityMinus = (e) => {
        var $quantityNum = $(".quantity-num");
        if ($quantityNum.val() > 1) {
            $quantityNum.val(+$quantityNum.val() - 1);
        }
        this.handleExpectedKm($quantityNum.val());
    }

    quantityPlus = (e) => {
        var $quantityNum = $(".quantity-num");
        $quantityNum.val(+$quantityNum.val() + 1);
        this.handleExpectedKm($quantityNum.val());
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
        //var differenceInDays = ''; 
        if(split(Difference_In_Days.toString(),{ separator: '.' })[1]>0){
            //this.setState({differenceInDays: Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1)});
            this.state.differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])+Number(1);
        }else{
            //this.setState({differenceInDays: Number(split(Difference_In_Days.toString(),{ separator: '.' })[0])});
            this.state.differenceInDays = Number(split(Difference_In_Days.toString(),{ separator: '.' })[0]);
        }
        this.listingAddons = carProductsAddons.map(function(finalAddons, index){
            return <label key={ index } className="btn">
                <input type="checkbox" name='extras[]' data-itemid={finalAddons.id} id={'extra_addons'+index} value={finalAddons.price} /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i><span>{finalAddons.name} </span> <div>Rs. {finalAddons.price}</div>
            </label>
        })
        this.listingData = this.state.searchOffers.map(function(finalData, index){
            /*backgroundColor: 'rgb(255 0 119 / 39%)', border: '1px rgb(255 0 119 / 39%) solid', borderRadius: '10px'*/
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
                            <div className="price">Prices starting from: <CurrencyFormat value={finalData.price_per_day} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /> per day</div>
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
        this.getCity = this.state.cityList.map(function(finalData, index){
            return <option key={ index } value={ finalData.id } selected={Number(offersPostData.rental_area) === finalData.id}>{ finalData.name }</option>
		})
        this.getState = this.state.stateList.map(function(finalData, index){
            return <option key={ index } value={ finalData.id }>{ finalData.name }</option>
		})
        this.getCountry = this.state.countryList.map(function(finalData, index){
            return <option key={ index } value={ finalData.id }>{ finalData.name }</option>
		})
        this.getEssentials = this.state.essentials.map(function(finalData, index){
            return <div key={ index } className="product-essentials" style={{width: '20%', float: 'left', padding: '15px 7px 15px 0'}}>
                    <input type="checkbox" id={"myCheckbox"+(index+1)} value={finalData.essential_price} />
                    <label htmlFor={"myCheckbox"+(index+1)}>
                        {(() => {
                            if(finalData.image_name){
                                return <img src={domainUrl+imageUrl+finalData.image_name} alt="" style={{width: '100%'}} />;
                            }else{
                                return <img src="assets/images/sample.jpg" alt="" style={{width: '100%'}} />;
                            }
                        })()}
                    </label>
                    <figcaption style={{color: '#848484', textAlign: 'center', marginTop: '5px'}}>{finalData.essential_name}</figcaption>
                    <figcaption style={{color: '#848484', textAlign: 'center', marginTop: '5px', fontSize: '10px'}}><CurrencyFormat value={finalData.essential_price} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /></figcaption>
                </div>
		})
        return (
            <div className="products products-grid products-grid-2 banner-2x">
                <div className="row">
                    <div id="msform">
                        <ul id="progressbar">
                            <li className="bar-list active"><span>Vehicle Selection</span></li>
                            <li className="bar-details"><span>Protection &amp; Extras</span></li>
                            <li className="bar-driver"><span>Driver Details</span></li>
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
                                    <span className="text-uppercase" style={{fontSize: '10px', position: 'relative', top: '-12px', backgroundColor: '#ffffff', padding: '2px 5px'}}>Sanitised For Your Safety</span>
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
                                                case "1":
                                                    return <li>Manual</li>;
                                                case "0":
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
                                                    return <li>{this.state.records.no_of_air_bags} Airbags</li>;
                                                case "0":
                                                    return <li>Airbags not available</li>
                                                default:
                                                    return <li></li>
                                            }
                                        })()}
                                        <li>Age limit - {this.state.records.age} yrs</li>
                                        <li>{this.state.records.mileage}</li>
                                    </ul>
                                    <div className="clearfix"></div>
                                    <ul>
                                        <li style={{float: 'left'}}>
                                            <div className="payment">
                                                <div className="btn-group btn-group-vertical" data-toggle="buttons">
                                                    <label className="btn active" style={{width: '100%', textAlign: 'left'}}>
                                                        <input type="radio" name='fuel' defaultChecked /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Petrol</span>
                                                    </label>
                                                    <label className="btn" style={{width: '100%', textAlign: 'left'}}>
                                                        <input type="radio" name='fuel' /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Diesel</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{float: 'left'}}>
                                            <div className="payment">
                                                <div className="btn-group btn-group-vertical" data-toggle="buttons">
                                                    <label className={(this.state.records.transmission === "2") ? "btn disabled" : "btn active"} style={{width: '100%', textAlign: 'left'}}>
                                                        <input type="radio" name='transmission' defaultChecked /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Manual</span>
                                                    </label>
                                                    <label className={(this.state.records.transmission === "1") ? "btn disabled" : "btn active"} style={{width: '100%', textAlign: 'left'}}>
                                                        <input type="radio" name='transmission' /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Automatic</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="clearfix"></div>
                                    <p style={{fontSize: '11px', color: '#848484', textAlign: 'left'}}>Select pricing type</p>
                                    <div className="price" style={{border: 'none', marginTop: '0', padding: '0'}}>
                                        <ul>
                                            <li>
                                                <div className="btn-group btn-group-vertical" data-toggle="buttons" style={{width: '100%'}} onClick={(e) => {document.getElementById('rental_fixed_hours').style.display = 'none';document.getElementById('rental_fixed_price').style.display = 'none';document.getElementById('rental_per_day_box').style.display = 'none';document.getElementById('rental_per_day_km').style.display = 'block';this.handleRentalPerDay(1)}}>
                                                    <label className="btn" style={{width: '100%', textAlign: 'left', backgroundColor: '#0f1b31', padding: '10px 15px', borderTop: '3px solid #060c17', borderRadius: 'unset'}}><input type="radio" name="rental_per_day" defaultValue={2} /> <i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span>Fixed kilometers</span></label>
                                                </div>
                                                <ul id={"rental_per_day_km"} style={{display: 'none', backgroundColor: '#0f1b31', padding: '0 10px 10px'}}>
                                                    <li style={{paddingTop: '10px', borderTop: '1px #848484 solid'}}>
                                                        <span className="pull-left">Rental per km</span>
                                                        <span className="pull-right"><CurrencyFormat value={this.state.records.price_per_km_after_cutoff} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /></span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    <li style={{paddingTop: '10px'}}>
                                                        <span className="pull-left">Cutoff Km</span>
                                                        <span className="pull-right">{this.state.records.cut_off_kms}</span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    <li style={{paddingTop: '10px'}}>
                                                        <span className="pull-left">Minimum Price</span>
                                                        <span className="pull-right"><CurrencyFormat value={this.state.records.price} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /></span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    <li style={{paddingTop: '10px'}}>
                                                        <span className="pull-left">Expected Km</span>
                                                        <span className="pull-right" style={{width: '50%'}}>
<div class="quantity-block">
    <button class="quantity-arrow-minus" onClick={(e)=>{this.quantityMinus(e)}}> - </button>
    <input class="quantity-num" type="number" defaultValue={this.state.records.cut_off_kms} onChange={(e) => {this.handleExpectedKm(e.target.value)}} />
    <button class="quantity-arrow-plus" onClick={(e)=>{this.quantityPlus(e)}}> + </button>
</div>
                                                            {/* <input type="number" defaultValue={this.state.records.cut_off_kms} onChange={(e) => {this.handleExpectedKm(e.target.value)}} style={{width: '100%'}} /> */}
                                                        </span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    <li style={{paddingTop: '10px'}}>
                                                        <span className="pull-left text-uppercase">Total</span>
                                                        <span className="pull-right" style={{textAlign: 'end'}}>
                                                            <b id="rental_per_km_total">{
                                                                this.state.expectedKmValue > this.state.records.cut_off_kms ? <CurrencyFormat value={Number( this.state.records.price )+(Number( this.state.expectedKmValue )-Number( this.state.records.cut_off_kms ))*Number( this.state.records.price_per_km_after_cutoff )} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /> : <CurrencyFormat value={this.state.records.price} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            }</b>
                                                        <br /><small>(Tax included)</small></span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                </ul>

                                                <div className="btn-group btn-group-vertical" data-toggle="buttons" style={{width: '100%'}} onClick={(e) => {document.getElementById('rental_fixed_hours').style.display = 'none';document.getElementById('rental_fixed_price').style.display = 'block';document.getElementById('rental_per_day_box').style.display = 'none';document.getElementById('rental_per_day_km').style.display = 'none';this.handleRentalPerDay(2)}}>
                                                    <label className="btn" style={{width: '100%', textAlign: 'left', backgroundColor: '#0f1b31', padding: '10px 15px', borderTop: '3px solid #060c17', borderRadius: 'unset'}}><input type="radio" name="rental_per_day" defaultValue={3} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Fixed price</span></label>
                                                </div>
                                                <ul id={"rental_fixed_price"} style={{display: 'none', backgroundColor: '#0f1b31', padding: '0 10px 10px'}}>
                                                    <li></li>
                                                </ul>

                                                <div className="btn-group btn-group-vertical" data-toggle="buttons" style={{width: '100%'}} onClick={(e) => {document.getElementById('rental_fixed_hours').style.display = 'block';document.getElementById('rental_fixed_price').style.display = 'none';document.getElementById('rental_per_day_box').style.display = 'none';document.getElementById('rental_per_day_km').style.display = 'none';this.handleRentalPerDay(3)}}>
                                                    <label className="btn" style={{width: '100%', textAlign: 'left', backgroundColor: '#0f1b31', padding: '10px 15px', borderTop: '3px solid #060c17', borderRadius: 'unset'}}><input type="radio" name="rental_per_day" defaultValue={4} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Fixed no of hours</span></label>
                                                </div>
                                                <ul id={"rental_fixed_hours"} style={{display: 'none', backgroundColor: '#0f1b31', padding: '0 10px 10px'}}>
                                                    <li></li>
                                                </ul>

                                                <div className="btn-group btn-group-vertical" data-toggle="buttons" style={{width: '100%'}} onClick={(e) => {document.getElementById('rental_fixed_hours').style.display = 'none';document.getElementById('rental_fixed_price').style.display = 'none';document.getElementById('rental_per_day_box').style.display = 'block';document.getElementById('rental_per_day_km').style.display = 'none';this.handleRentalPerDay(4)}}>
                                                    <label className="btn" style={{width: '100%', textAlign: 'left', backgroundColor: '#0f1b31', padding: '10px 15px', borderTop: '3px solid #060c17', borderRadius: 'unset'}}><input type="radio" name="rental_per_day" defaultChecked defaultValue={1} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Day wise pricing</span></label>
                                                </div>
                                                <ul id={"rental_per_day_box"} style={{display: 'block', backgroundColor: '#0f1b31', padding: '0 10px 10px'}}>
                                                    <li style={{paddingTop: '10px', borderTop: '1px #848484 solid'}}>
                                                        <span className="pull-left">Rental per day</span>
                                                        <span className="pull-right"><CurrencyFormat value={this.state.records.price_per_day} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /></span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    <li style={{paddingTop: '10px'}}>
                                                        <span className="pull-left">Rental period</span>
                                                        <span className="pull-right">{this.state.differenceInDays} days</span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                    <li style={{paddingTop: '10px'}}>
                                                        <span className="pull-left text-uppercase">Total</span>
                                                        <span className="pull-right" style={{textAlign: 'end'}}><b id="rental_per_day_total"><CurrencyFormat value={this.state.records.price_per_day*this.state.differenceInDays} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} /></b><br /><small>(Tax included)</small></span>
                                                        <div className="clearfix"></div>
                                                    </li>
                                                </ul>
                                                
                                                <div className="clearfix"></div>
                                                {/* <input type="hidden" id="rental_per_day_val" defaultValue={this.state.rentalPerDayVal ? this.state.rentalPerDayVal : 1} /> */}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="payment" style={{marginTop: '0', marginBottom: '45px'}}>
                                        {/* <div className="btn-group btn-group-vertical" data-toggle="buttons">
                                            <label className="btn active">
                                                <input type="radio" name='payment' defaultChecked /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Pay online </span> <span>(money saver)</span>
                                            </label>
                                            <label className="btn">
                                                <input type="radio" name='payment' /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Pay later </span> <span>(Flexible rebooking)</span>
                                            </label>
                                        </div> */}
                                        <button className="btn show-offer-btn text-uppercase pull-left" data-dismiss="modal" aria-label="Close" style={{width: '47%', padding: '8px 16px', fontSize: '8px', color: '#000', fontWeight: 'bold', backgroundColor: '#eccd01'}}>Become a prime Member<br />And Save 12%</button>
                                        <button className="btn show-offer-btn text-uppercase pull-right" data-dismiss="modal" aria-label="Close" style={{width: '47%', fontSize: '10px'}} onClick={() => {document.getElementById('productProtectionExtras1').style.display = 'block';document.getElementById('productVehicleSelection').style.display = 'none';document.getElementsByClassName('bar-list')[0].classList.remove('active');document.getElementsByClassName('bar-list')[0].classList.add('complete');document.getElementsByClassName('bar-details')[0].classList.add('active')}}>Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row product-protection-extras" id={"productProtectionExtras1"} style={{display: 'none'}}>
                    <div className="col-lg-12">
                        <h4>{this.state.records.product_name}</h4>
                    </div>
                    <div className="col-lg-4">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{border: 'none'}}>
                            <ol className="carousel-indicators">
                                {(() => {
                                    switch (this.state.records.product_image_name) {
                                        case "":
                                            return '';
                                        default:
                                            return <li data-target="#myCarousel" data-slide-to="0" className="active"></li>;
                                    }
                                })()}
                            </ol>
                            <div className="carousel-inner">
                                {(() => {
                                    if(this.state.records.product_image_name){
                                        return <div className="item active">
                                                <img src={domainUrl+imageUrl+this.state.records.product_image_name} alt="" style={{width: '100%'}} />
                                            </div>;
                                    }else{
                                        return <div className="item active">
                                                <img src="assets/images/sample.jpg" alt="" />
                                            </div>;
                                    }
                                })()}
                            </div>
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="fa fa-chevron-circle-left" style={{position: 'absolute', top: '45%'}}></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="fa fa-chevron-circle-right" style={{position: 'absolute', top: '45%'}}></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    {/* <div className="col-lg-3">
                        <h5>Your offer includes</h5>
                        <ul>
                            {this.listingcarinclusion}
                        </ul>
                    </div> */}
                    <div className="col-lg-8">
                        <h5>1. Select Offers</h5>
                        <div onChange={(e)=>{this.handleSelectOffers(e)}}>{this.getEssentials}</div>
                        <div className="clearfix"></div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><button className="btn show-offer-btn" style={{border: '2px solid #FF0077', backgroundColor: 'transparent', color: '#FF0077'}}><i className="fa fa-arrow-left"></i> Back</button></td>
                                        <td>
                                            <div className="total">Total</div>
                                            <div className="tax">(Tax included) </div>
                                        </td>
                                        <td>
                                            <div className="total-amount">
                                                <b id="extra_addons_total_1">
                                                    {(() => {
                                                        if(Number(this.state.rentalPerDayVal) === 1){
                                                            return <CurrencyFormat value={Number( this.state.records.price )+(Number( this.state.expectedKmValue )-Number( this.state.records.cut_off_kms ))*Number( this.state.records.price_per_km_after_cutoff )} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }else if(Number(this.state.rentalPerDayVal) === 2){
                                                            return <CurrencyFormat value={this.state.records.price_per_day*this.state.differenceInDays} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }else if(Number(this.state.rentalPerDayVal) === 3){
                                                            return <CurrencyFormat value={this.state.records.price_per_day*this.state.differenceInDays} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }else if(Number(this.state.rentalPerDayVal) === 4){
                                                            return <CurrencyFormat value={this.state.records.price_per_day*this.state.differenceInDays} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }
                                                    })()}
                                                </b>
                                            </div>
                                            {/* <div className="view-detail"><Link to={"#"}>View details</Link></div> */}
                                        </td>
                                        <td>
                                            <button className="btn show-offer-btn" onClick={() => {document.getElementById('productProtectionExtras1').style.display = 'none';document.getElementById('productProtectionExtras2').style.display = 'block'}}>Continue</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="row product-protection-extras" id={"productProtectionExtras2"} style={{display: 'none'}}>
                    <div className="col-lg-12">
                        <h4>{this.state.records.product_name}</h4>
                    </div>
                    <div className="col-lg-4">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{border: 'none'}}>
                            <ol className="carousel-indicators">
                                {(() => {
                                    switch (this.state.records.product_image_name) {
                                        case "":
                                            return '';
                                        default:
                                            return <li data-target="#myCarousel" data-slide-to="0" className="active"></li>;
                                    }
                                })()}
                            </ol>
                            <div className="carousel-inner">
                                {(() => {
                                    switch (this.state.records.product_image_name) {
                                        case "":
                                            return <div className="item active">
                                                <img src="assets/images/product1.png" alt="" />
                                            </div>;
                                        default:
                                            return <div className="item active">
                                                <img src={domainUrl+imageUrl+this.state.records.product_image_name} alt="" />
                                            </div>;
                                    }
                                })()}
                            </div>
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="fa fa-chevron-circle-left" style={{position: 'absolute', top: '45%'}}></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="fa fa-chevron-circle-right" style={{position: 'absolute', top: '45%'}}></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    {/* <div className="col-lg-3">
                        <h5>Your offer includes</h5>
                        <ul>
                            {this.listingcarinclusion}
                        </ul>
                    </div> */}
                    <div className="col-lg-8">
                        <h5>2. Vehicle Add ons</h5>
                        <div className="btn-group btn-group-vertical" data-toggle="buttons" onChange={(e)=>{this.handleListingAddons(e)}}>
                            {this.listingAddons}
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><button className="btn show-offer-btn" style={{border: '2px solid #FF0077', backgroundColor: 'transparent', color: '#FF0077'}}><i className="fa fa-arrow-left"></i> Back</button></td>
                                        <td>
                                            <div className="total">Total</div>
                                            <div className="tax">(Tax included) </div>
                                        </td>
                                        <td>
                                            <div className="total-amount">
                                                <b id="extra_addons_total_2">
                                                {/* {(() => {
                                                        if(Number(this.state.rentalPerDayVal) === 1){
                                                            return <CurrencyFormat value={Number(Number(this.state.records.price)+(Number(this.state.expectedKmValue)-Number(this.state.records.cut_off_kms))*Number(this.state.records.price_per_km_after_cutoff))+Number(this.state.essentialsCheckedSum)} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }else if(Number(this.state.rentalPerDayVal) === 2){
                                                            return <CurrencyFormat value={Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }else if(Number(this.state.rentalPerDayVal) === 3){
                                                            return <CurrencyFormat value={Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }else if(Number(this.state.rentalPerDayVal) === 4){
                                                            return <CurrencyFormat value={Number(this.state.records.price_per_day*this.state.differenceInDays)+Number(this.state.essentialsCheckedSum)} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        }
                                                    })()} */}
                                                </b>
                                            </div>
                                            {/* <div className="view-detail"><Link to={"#"}>View details</Link></div> */}
                                        </td>
                                        <td>
                                            <button className="btn show-offer-btn" onClick={() => {document.getElementById('productProtectionExtras2').style.display = 'none';document.getElementById('productProtectionExtras3').style.display = 'block'}}>Continue</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row product-protection-extras" id={"productProtectionExtras3"} style={{display: 'none'}}>
                    <div className="col-lg-12">
                        <h4>{this.state.records.product_name}</h4>
                    </div>
                    <div className="col-lg-4">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{border: 'none'}}>
                            <ol className="carousel-indicators">
                                {(() => {
                                    switch (this.state.records.product_image_name) {
                                        case "":
                                            return '';
                                        default:
                                            return <li data-target="#myCarousel" data-slide-to="0" className="active"></li>;
                                    }
                                })()}
                            </ol>
                            <div className="carousel-inner">
                                {(() => {
                                    switch (this.state.records.product_image_name) {
                                        case "":
                                            return <div className="item active">
                                                <img src="assets/images/product1.png" alt="" />
                                            </div>;
                                        default:
                                            return <div className="item active">
                                                <img src={domainUrl+imageUrl+this.state.records.product_image_name} alt="" />
                                            </div>;
                                    }
                                })()}
                            </div>
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="fa fa-chevron-circle-left" style={{position: 'absolute', top: '45%'}}></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="fa fa-chevron-circle-right" style={{position: 'absolute', top: '45%'}}></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    {/* <div className="col-lg-3">
                        <h5>Your offer includes</h5>
                        <ul>
                            {this.listingcarinclusion}
                        </ul>
                    </div> */}
                    <div className="col-lg-8">
                        <h5>3. Entertainment add ons</h5>
                        <div style={{width: '25%', float: 'left', padding: '15px 7px 15px 0'}}>
                            <img src="assets/images/5.jpg" alt="" />
                        </div>
                        <div style={{width: '25%', float: 'left', padding: '15px 7px 15px 7px'}}>
                            <img src="assets/images/6.jpg" alt="" />
                        </div>
                        <div style={{width: '25%', float: 'left', padding: '15px 7px 15px 7px'}}>
                            <img src="assets/images/7.jpg" alt="" />
                        </div>
                        <div style={{width: '25%', float: 'left', padding: '15px 0 15px 7px'}}>
                            <img src="assets/images/8.jpg" alt="" />
                        </div>
                        <div className="clearfix"></div>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><button className="btn show-offer-btn" style={{border: '2px solid #FF0077', backgroundColor: 'transparent', color: '#FF0077'}}><i className="fa fa-arrow-left"></i> Back</button></td>
                                        <td>
                                            <div className="total">Total</div>
                                            <div className="tax">(Tax included) </div>
                                        </td>
                                        <td>
                                            <div className="total-amount">
                                                <b id="extra_addons_total_3">
                                                {/* {(() => {
                                                    if(Number(this.state.extraAddonsVal) === 0){
                                                        return (Number($('#rental_per_day_val').val()) === Number(1)) ? (Number($('#rental_per_day_total').html())+Number(this.state.extraAddonsVal)) : (Number(this.state.expectedKmValue > this.state.records.cut_off_kms ? Number(this.state.records.price)+(Number(this.state.expectedKmValue)-Number(this.state.records.cut_off_kms))*Number(this.state.records.price_per_km_after_cutoff) : Number(this.state.records.price))+Number(this.state.extraAddonsVal))
                                                    }else{
                                                        return (this.state.extraAddonsVal.map(function(finalExtraAddonsVal, index){
                                                            return (Number($('#rental_per_day_val').val()) === Number(1)) ? (Number($('#rental_per_day_total').html())+Number(finalExtraAddonsVal.value)) : (Number(this.state.expectedKmValue > this.state.records.cut_off_kms ? Number(this.state.records.price)+(Number(this.state.expectedKmValue)-Number(this.state.records.cut_off_kms))*Number(this.state.records.price_per_km_after_cutoff) : Number(this.state.records.price))+Number(finalExtraAddonsVal.value))
                                                        }))
                                                    }
                                                })()} */}
                                                </b>
                                            </div>
                                            {/* <div className="view-detail"><Link to={"#"}>View details</Link></div> */}
                                        </td>
                                        <td>
                                            <button className="btn show-offer-btn" onClick={() => {document.getElementById('productProtectionExtras3').style.display = 'none';document.getElementById('productDriverDetails').style.display = 'block';document.getElementsByClassName('bar-details')[0].classList.remove('active');document.getElementsByClassName('bar-details')[0].classList.add('complete');document.getElementsByClassName('bar-driver')[0].classList.add('active')}}>Continue</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row product-driver-details" id={"productDriverDetails"} style={{'display': 'none'}}>
                    <Formik
                        initialValues={{ first_name:'', last_name:'', email:'', mobile_number:'', dob_year: '', address:'', city:'', state:'', country:'', zip_code:'' }}
                        validate={values => {
                            const errors = {};
                            if(!values.first_name) {
                                errors.first_name = 'Required';
                            }
                            if(!values.last_name) {
                                errors.last_name = 'Required';
                            }
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            if(!values.mobile_number) {
                                errors.mobile_number = 'Required';
                            }
                            if(!values.dob_year) {
                                errors.dob_year = 'Required';
                            }
                            if(!values.address) {
                                errors.address = 'Required';
                            }
                            if(!values.city) {
                                errors.city = 'Required';
                            }
                            if(!values.state) {
                                errors.state = 'Required';
                            }
                            if(!values.country) {
                                errors.country = 'Required';
                            }
                            if(!values.zip_code) {
                                errors.zip_code = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                this.submitBooking(values);
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                         {/* onClick={e => {this.submitBooking(e)}} */}
                        {({ isSubmitting }) => (
                        <Form>
                            <div className="col-lg-7">
                                <h5>Personal Details</h5>
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
                                    <div className="formErrorMsg"><ErrorMessage name="driver_pre_name" /></div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>First name</label>
                                        <input type="text" name="first_name" />
                                        <div className="formErrorMsg"><ErrorMessage name="first_name" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Last name</label>
                                        <input type="text" name="last_name" />
                                        <div className="formErrorMsg"><ErrorMessage name="last_name" /></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" name="email" />
                                        <div className="formErrorMsg"><ErrorMessage name="email" /></div>
                                    </div>
                                    <div className="form-group mobile">
                                        <label>Mobile</label>
                                        <select name="country_code">
                                            <option value="">+91</option>
                                            <option value="">+88</option>
                                        </select>
                                        <input type="text" name="mobile_number" />
                                        <div className="formErrorMsg"><ErrorMessage name="mobile_number" /></div>
                                    </div>
                                    <div className="form-group dob">
                                        <label>Mobile</label>
                                        <input type="text" name="dob_date" placeholder="DD" />
                                        <input type="text" name="dob_month" placeholder="MM" />
                                        <input type="text" name="dob_year" placeholder="YYYY" />
                                        <i className="fa fa-calendar"></i>
                                        <div className="clearfix"></div>
                                        <div className="formErrorMsg"><ErrorMessage name="dob_year" /></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input type="text" name="address" />
                                        <div className="formErrorMsg"><ErrorMessage name="address" /></div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>City</label>
                                            <select name="city">
                                                {this.getCity}
                                            </select>
                                        </div>
                                        <div className="formErrorMsg"><ErrorMessage name="city" /></div>
                                    </div>
                                    <div className="col-lg-6" style={{paddingLeft: '15px !important'}}>
                                        <div className="form-group">
                                            <label>State</label>
                                            <select name="state">
                                                {this.getState}
                                            </select>
                                        </div>
                                        <div className="formErrorMsg"><ErrorMessage name="state" /></div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select name="country">
                                                {this.getCountry}
                                            </select>
                                        </div>
                                        <div className="formErrorMsg"><ErrorMessage name="country" /></div>
                                    </div>
                                    <div className="col-lg-6" style={{paddingLeft: '15px !important'}}>
                                        <div className="form-group">
                                            <label>ZIP</label>
                                            <input type="text" name="zip_code" />
                                        </div>
                                        <div className="formErrorMsg"><ErrorMessage name="zip_code" /></div>
                                    </div>
                                </div>
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
                                                    <div className="total-amount" id="final_total_amount">
                                                        {/* Rs. {
                                                                this.state.expectedKmValue > this.state.records.cut_off_kms ? Number( this.state.records.price
                                                                    )+(Number( this.state.expectedKmValue
                                                                    )-Number( this.state.records.cut_off_kms
                                                                    ))*Number( this.state.records.price_per_km_after_cutoff
                                                                    ) : Number( this.state.records.price
                                                                        )
                                                            } */}
                                                            </div>
                                                    {/* <div className="view-detail"><Link to={"#"}>View details</Link></div> */}
                                                </td>
                                                <td>
                                                    <button type="submit" disabled={isSubmitting} className="btn show-offer-btn book-now-btn">Book &amp; Pay</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Form>
                        )}
                    </Formik>
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