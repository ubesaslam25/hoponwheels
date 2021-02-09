import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilterForm from './FilterForm';
//const navPath = '/reactapp/';
const navPath = '/';
var $ = require( "jquery" );

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }
    
    componentDidMount() {
		if (document.documentElement.clientWidth <= 360) {
			var dektopView = document.getElementsByClassName("dektopView");
			for (let i = 0; i < dektopView.length; i++) {
				dektopView[i].remove();
			}
		}else{
			document.getElementsByClassName("bs-filter-collapse")[0].remove();
		}
    }

    render() {
        //const { data, value } = this.state;
        return (
            <header id="wrap-header" className="color-inher sticky">
				<div className="top-header">
					<div className="container">
						<div className="row">
							<div className="col-sm-2 col-md-2 col-lg-2">
								<button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse" onClick={()=>{$(".bs-navbar-collapse").show()}}>
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-filter-collapse" onClick={()=>{$(".bs-filter-collapse").show()}}>
									<i className="fa fa-filter"></i>
								</button>
								<Link to={navPath} className="logo"><img src="assets/images/logo_1.png" alt="logo" /></Link>
							</div>
							<div className="col-sm-4 col-md-4 col-lg-4 dektopView">
								<ul className="pull-left top-left-nav">
									<li className="active"><Link to={"#"} className="icon-1"><span>Rent</span></Link></li>
									<li><Link to={"#"} className="icon-1"><span>Share</span></Link></li>
									<li><Link to={"#"} className="icon-1"><span>Ride</span></Link></li>
								</ul>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6">
								<ul className="pull-right top-right-nav">
									<li className="dektopView"><Link to={"#"} className="icon-1"><span>Become a partner</span></Link></li>
									<li className="dektopView"><Link to={"#"} className="icon-1"><span>Customer Support</span></Link></li>
									<li className="dektopView">
										<div className="dropdown">
											<span className="dropdown-toggle" data-toggle="dropdown">
												<Link to={"#"} className="icon-1">
													<span>INR (<i className="fa fa-inr"></i>)</span>
													<i className="fa fa-angle-down"></i>
												</Link>
											</span>
										</div>
									</li>
									<li>
										<div className="dropdown">
											<span className="dropdown-toggle" data-toggle="dropdown">
												<Link to={"#"}>
													<span>Hi, User </span>
													{/* <div className="user-image">
														<img src="assets/images/face-2.jpg" alt="user-icon" className="img-responsive" />
														<i className="fa fa-angle-down"></i>
													</div> */}
												</Link>
											</span>
										</div>
									</li>
								</ul>
							</div>

							<div className="modal left fade in bs-navbar-collapse" tabIndex="-1" role="dialog">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-body">
											<button type="button" className="close"><span aria-hidden="true" onClick={()=>{$(".bs-navbar-collapse").hide()}}>&times;</span></button>
											<ul className="pull-left top-left-nav">
												<li className="active"><Link to={"#"}><span>Rent</span></Link></li>
												<li><Link to={"#"}><span>Share</span></Link></li>
												<li><Link to={"#"}><span>Ride</span></Link></li>
												<li><Link to={"#"}><span>Become a partner</span></Link></li>
												<li><Link to={"#"}><span>Customer Support</span></Link></li>
											</ul>
											<div className="clearfix"></div>
										</div>
									</div>
								</div>
							</div>

							<div className="modal left fade in bs-filter-collapse" tabIndex="-1" role="dialog">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-body">
											<button type="button" className="close"><span aria-hidden="true" onClick={()=>{$(".bs-filter-collapse").hide()}}>&times;</span></button>
											<div className="mobileView"><FilterForm /></div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</header>
        )
    }
}

export default Header;