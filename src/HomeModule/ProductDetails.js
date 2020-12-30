import React, { Component } from 'react';
import $ from "jquery";
const domainUrl = "http://localhost/hoponwheels/";
//const domainUrl = "http://yotour.in/hoponwheels/";
const apiUrl = "api/product/details/";
const imageUrl = "storage/app/images/";
const addonsApiUrl = "api/addons";
const allProducts = "api/products/";
//const split = require('split-string');
//const navPath = '/reactapp/';
const navPath = '/';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            inclusion: [],
            addons: [],
            expectedKmValue: '',
            rentalPerDayVal: '',
            searchOffers: [],
            pageName: JSON.parse(localStorage.getItem('pageName'))

        };
        //this.state.postdata = JSON.parse(localStorage.getItem('result'));
    }
    
    async componentDidMount() {
        const that = this; 
        const urlSegment = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
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
        
        fetch(domainUrl+allProducts)
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

    handleRentalPerDay = (e) => {
        const target = e;
        this.setState({rentalPerDayVal: target});
    }

    render() {
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
                                                <span className="pull-right"> days</span>
                                                <div className="clearfix"></div>
                                            </li>
                                            <li>
                                                <span className="pull-left text-uppercase">Total</span>
                                                <span className="pull-right" style={{textAlign: 'end'}}>Rs. <b id="rental_per_day_total"></b><br /><small>(Tax included)</small></span>
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
                
            </div> 
        )
    }
}

export default ProductDetails;