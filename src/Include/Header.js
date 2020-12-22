import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
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
            <header id="wrap-header" className="color-inher sticky">
				<div className="top-header">
					<div className="container">
						<div className="row">
							<div className="col-sm-2 col-md-2 col-lg-2">
								<Link to={"/"} className="logo"><img src="assets/images/logo_1.png" alt="logo" /></Link>
							</div>
							<div className="col-sm-4 col-md-4 col-lg-4">
								<ul className="pull-left top-left-nav">
									<li className="active"><Link to={"#"} className="icon-1"><span>Rent</span></Link></li>
									<li><Link to={"#"} className="icon-1"><span>Share</span></Link></li>
									<li><Link to={"#"} className="icon-1"><span>Ride</span></Link></li>
								</ul>
							</div>
							<div className="col-sm-6 col-md-6 col-lg-6">
								<ul className="pull-right top-right-nav">
									<li><Link to={"#"} className="icon-1"><span>Become a partner</span></Link></li>
									<li><Link to={"#"} className="icon-1"><span>Customer Support</span></Link></li>
									<li>
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
												<Link to={"#"} className="icon-1">
													<span>Hi, User </span>
													<div className="user-image">
														<img src="assets/images/face-2.jpg" alt="user-icon" className="img-responsive" />
														<i className="fa fa-angle-down"></i>
													</div>
												</Link>
											</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
        )
    }
}

export default Header;