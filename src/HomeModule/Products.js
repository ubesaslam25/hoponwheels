import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
const domainUrl = "http://localhost/hoponwheels/";
//const domainUrl = "http://yotour.in/hoponwheels/";
const apiUrl = "api/products";
const imageUrl = "storage/app/images/";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
    }
    
    async componentDidMount() {
        const that = this; 
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify()
        // };
        const response = await fetch(domainUrl+apiUrl+'/7');
        const data = await response.json();
        if(data.length > 1){
            that.setState({ records: data });
        }
    }

    render() {
        this.listingData = this.state.records.map(function(finalData, index){
            return <div key={ index } className="col-lg-3">
                <div className="products-item">
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
                <h3 className="f-weight-300">Wheels for all Kind of needs</h3>
                <div className="row">
                    {this.listingData}
                    <div className="col-lg-3">
                        <div className="products-item products-item-last-grid">
                            <div className="products-item-btn"><button className="btn show-offer-btn text-uppercase">View All</button></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Products;