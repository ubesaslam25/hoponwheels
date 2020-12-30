import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import $ from "jquery";
//const domainUrl = "http://localhost/hoponwheels/";
const domainUrl = "http://yotour.in/hoponwheels/";
const apiUrl = "api/products/offers/";
const imageUrl = "storage/app/images/";
//const split = require('split-string');
//const navPath = '/reactapp/';
const navPath = '/';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            postdata: JSON.parse(localStorage.getItem('result'))
        };
    }
    
    async componentDidMount() {
        const that = this; 
        const offersPostData = this.state.postdata;
        const response = await fetch(domainUrl+apiUrl+offersPostData['rental_area']);
        const data = await response.json();
        that.setState({ records: data.data });
    }

    render() {
        this.listingDataCount = this.state.records.length;
        this.listingDataVehicleType = this.state.records.map(function(finalData, index){
            return <option key={ index } value={finalData.vehicle_type}>{finalData.vehicle_type}</option>
        });
        this.listingData = this.state.records.map(function(finalData, index){
            return <div key={ index }>
                <div className="col-lg-3">
                    <div className="products-item" /*data-toggle="modal" data-target={"#productDetailsSideBar"+index}*/ onClick={() => {localStorage.setItem('pageName', JSON.stringify('offers'));window.location.replace(navPath+finalData.slug);}}>
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

                <div className="row product-vehicle-selection" id="productVehicleSelection">
                    {this.listingData}
                </div>
            </div> 
        )
    }
}

export default Products;