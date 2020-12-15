import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class OurLocation extends Component {
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
            <div className="how-location car m-t-lg-90 p-t-sm-35 m-b-lg-20">
                <h3>Hop of Wheels locations</h3>
                <div className="row" align="center">
                    <div className="city">5+<br />Cities</div>
                    <button className="btn show-offer-btn location-btn">Find a location</button>
                    <img src="assets/images/map.png" alt="" />
                    <div className="pickup-spots">300+<br />pick up spots</div>
                </div>
            </div> 
        )
    }
}

export default OurLocation;