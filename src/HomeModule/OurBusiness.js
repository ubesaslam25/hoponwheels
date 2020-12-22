import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class OurBusiness extends Component {
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
            <div className="my-business car m-t-lg-90 p-t-sm-35 m-b-lg-20">
                <h3>Become a part of us</h3>
                <p>Join Hop on Wheels family and be a part of the extravaganza</p>
                <div className="row">
                    <div className="business-box">
                        <div className="business-box-img" style={{backgroundImage: 'url(assets/images/my-business-1.png)'}}></div>	
                        <div className="business-box-caption">
                            <div className="description">Automated online on-boarding process</div>
                        </div>
                    </div>
                    <div className="business-box">
                        <div className="business-box-img" style={{backgroundImage: 'url(assets/images/my-business-2.png)'}}></div>	
                        <div className="business-box-caption">
                            <div className="description">Attractive returns</div>
                        </div>
                    </div>
                    <div className="business-box">
                        <div className="business-box-img" style={{backgroundImage: 'url(assets/images/my-business-3.png)'}}></div>	
                        <div className="business-box-caption">
                            <div className="description">Automatic payments</div>
                        </div>
                    </div>
                    <div className="business-box">
                        <div className="business-box-img" style={{backgroundImage: 'url(assets/images/my-business-4.png)'}}></div>	
                        <div className="business-box-caption">
                            <div className="description">100% transparency</div>
                        </div>
                    </div>
                    <div className="business-box">
                        <div className="business-box-img" style={{backgroundImage: 'url(assets/images/my-business-5.png)'}}></div>	
                        <div className="business-box-caption">
                            <div className="description">Sales reporting</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OurBusiness;