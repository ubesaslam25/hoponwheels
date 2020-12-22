import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Footer extends Component {
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
            <footer id="wrap-footer" className="bg-gray-1 color-inher">
				<div className="footer-top">
					<div className="container">
						<div className="bg-gray-1 p-l-r">
							<div className="row">
								<div className="col-xs-12 col-sm-2 col-md-2 footer-box-1">
									<img src="assets/images/logo_2.png" alt="" />
									<div className="google-play">
										<i className="fa fa-play"></i>
										<span>Get It On <br /><b>Google Play</b></span>
										<div className="clearfix"></div>
									</div>
									<div className="clearfix"></div>
									<div className="app-store">
										<i className="fa fa-apple"></i>
										<span>Get It On <br /><b>App Store</b></span>
										<div className="clearfix"></div>
									</div>
									<div className="clearfix"></div>
								</div>
								<div className="col-xs-12 col-sm-3 col-md-3 footer-box-2">
									<div className="newsletter text-left">
										<ul className="list-default">
											<li>
												<Link to={"#"}>
													<span><i className="fa fa-phone"></i> <b>0123-456-789</b></span>
													<span className="caption">Phone Support (IVR)</span>
												</Link>
												<div className="clearfix"></div>
											</li>
											<li>
												<Link to={"#"}>
													<span><i className="fa fa-envelope-o"></i> <b>connect@hop.in</b></span>
													<span className="caption">For booking related matters</span>
												</Link>
												<div className="clearfix"></div>
											</li>
											<li>
												<Link to={"#"}>
													<span><i className="fa fa-envelope-o"></i> <b>info@hop.in</b></span>
													<span className="caption">For business related matters</span>
												</Link>
												<div className="clearfix"></div>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-xs-12 col-sm-5 col-md-5 footer-box-3">
									<h3>Cities</h3>
									<ul className="list-default">
										<li><Link to={"#"}>Berlin</Link></li>
										<li><Link to={"#"}>Florence</Link></li>
										<li><Link to={"#"}>Budapest</Link></li>
										<li><Link to={"#"}>Prague</Link></li>
									</ul>
									<ul className="list-default">
										<li><Link to={"#"}>Madrid</Link></li>
										<li><Link to={"#"}>Zurich</Link></li>
										<li><Link to={"#"}>Rome</Link></li>
										<li><Link to={"#"}>Amsterdam</Link></li>
									</ul>
									<ul className="list-default">
										<li><Link to={"#"}>Madrid</Link></li>
										<li><Link to={"#"}>Zurich</Link></li>
										<li><Link to={"#"}>Rome</Link></li>
										<li><Link to={"#"}>Amsterdam</Link></li>
									</ul>
									<ul className="list-default">
										<li><Link to={"#"}>Madrid</Link></li>
										<li><Link to={"#"}>Zurich</Link></li>
										<li><Link to={"#"}>Rome</Link></li>
										<li><Link to={"#"}>Amsterdam</Link></li>
									</ul>
									<div className="clearfix"></div>
								</div>
								<div className="col-xs-12 col-sm-2 col-md-2 footer-box-4">
									<h3>Usefull Links</h3>
									<ul className="list-default">
										<li><Link to={"#"}>About Us</Link></li>
										<li><Link to={"#"}>Contact Us</Link></li>
										<li><Link to={"#"}>FAQs</Link></li>
										<li><Link to={"#"}>Careers</Link></li>
										<li><Link to={"#"}>Media</Link></li>
										<li><Link to={"#"}>Legal</Link></li>
										<li><Link to={"#"}>Sustainable Travel</Link></li>
									</ul>
									<div className="footer-bt">
										<ul className="social-icon list-inline pull-left">
											<li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
											<li><Link to={"#"}><i className="fa fa-youtube"></i></Link></li>
											<li><Link to={"#"}><i className="fa fa-instagram"></i></Link></li>
											<li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-bt color-inher">
					<div className="container">
						<div className="bg-gray-0c p-l-r">
							<div className="row">
								<div className="col-md-12 text-center">
									<p>© 2016 - 2019 Hop on Wheels</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
        )
    }
}

export default Footer;