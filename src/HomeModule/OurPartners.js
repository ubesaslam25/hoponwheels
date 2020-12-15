import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class OurPartners extends Component {
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
            <div className="our-partners car m-t-lg-90 p-t-sm-35 m-b-lg-20">
                <h3>Our Partners</h3>
                <div className="row">
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/1.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/2.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/3.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/4.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/5.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/6.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/7.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/8.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/9.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/10.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/11.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/12.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/13.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/14.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/15.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-lg-2">
                        <Link to={"#"}>
                            <img src="assets/images/clients/16.png" alt="" />
                        </Link>
                    </div>
                </div>
            </div>  
        )
    }
}

export default OurPartners;