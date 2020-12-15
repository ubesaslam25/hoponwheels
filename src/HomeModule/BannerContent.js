import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class BannerContent extends Component {
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
            <section className="block-sl">
				<div className="container">
					<div className="row">
						<div className="col-sm-1 col-md-1 col-lg-1"></div>
						<div className="col-sm-10 col-md-10 col-lg-10">
							<div className="banner-text-offer banner-item banner-2x no-bg color-inher">
								<div className="col-sm-6 col-md-6 col-lg-6">
									<img src="assets/images/sticker.png" className="img-responsive" alt="" />
									<h3 className="text-uppercase text-left">Quality Rentals To Get You Moving</h3>
									<p className="text-left" style={{fontSize: 'var(--font12px)'}}>Book now and save up to 40% at downtown locations</p>
								</div>
							</div>
						</div>
						<div className="col-sm-1 col-md-1 col-lg-1"></div>
					</div>
					<div className="row text-center">
						<Link to={"#wrap-body"} className="scroll-text">Scroll Down</Link>
						<Link to={"#wrap-body"} className="scroll-icon"><span></span><span></span></Link>
					</div>
				</div>
			</section>
        )
    }
}

export default BannerContent;