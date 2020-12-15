import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import $ from 'jquery';
class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }
    
    componentWillMount() {
        
	}
	
	handlePickup = () => {
		$('#pickupdatepicker').datetimepicker({allowTimes:[]});
		$('#pickupdatepicker').datetimepicker('show');
	}

    render() {
        //const { data, value } = this.state;
        return (
            <div className="search-1 m-t-sm-40">
				<div className="container">
					<div className="search-option p-b-sm-30 p-r-sm-45 p-xs-15 custom-search-box">
						<div className="row">
							<div className="main-timeline">
								<div className="timeline">
									<div className="timeline-content">
										<div className="description">
											<div className="form-group">
												<label>Rental Area</label>
												<select className="form-control">
													<option>Select City</option>
												</select>
											</div>
											<div className="form-group">
												<label>Rental Period</label>
												<div className="form-inline">
													<div className="btn-group btn-group-vertical" data-toggle="buttons">
														<label className="btn active" style={{opacity: '1'}}>
														  <input type="radio" name='rental_period' checked /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Short-term </span>
														</label>
														<label className="btn" style={{opacity: '1'}}>
														  <input type="radio" name='rental_period' /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Long-term</span>
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="timeline">
									<div className="timeline-content">
										<div className="description text-center">
											<img src="assets/images/car-icon.png" width="64" alt="" />
											<figcaption className="text-center">Car</figcaption>
											<div className="vehicle-select">
												<div className="vehicle-select-1 text-center"><span>Coming soon</span></div>
												<label className="vehicle-select-2 text-center layersMenu">
													<input type="radio" name="zoomsMBtiles" value="14" />
													<img src="assets/images/icons/surface.svg" width="64" alt="" />
													<figcaption className="text-center">Bicycle</figcaption>
												</label>
												
												<label className="vehicle-select-3 text-center layersMenu">
													<input type="radio" name="zoomsMBtiles" value="18" />
													<img src="assets/images/icons/bike.svg" width="64" alt="" />
												  	<figcaption className="text-center">Bike</figcaption>
												</label>

												<label className="vehicle-select-4 text-center layersMenu">
													<input type="radio" name="zoomsMBtiles" value="18" />
													<img src="assets/images/icons/van.svg" width="64" alt="" />
												  	<figcaption className="text-center">Others</figcaption>
												</label>
											</div>
											<div className="claerfix"></div>
										</div>
									</div>
								</div>
								<div className="timeline">
									<div className="timeline-content">
										<div className="description pickup">
											<div className="form-group">
												<label>Pick Up</label>
												<input type="text" className="form-control" placeholder="Enter location" />
											</div>
											<div className="form-group">
												<input type="hidden" id="pickupdatepicker" />
												<div className="form-inline" onClick={this.handlePickup}>
													<label style={{opacity: '1'}}><span id="pickupdate">17</span> <span id="pickupmonth" style={{color: 'var(--white)'}}>Nov</span> <i className="fa fa-calendar"></i></label>
													<label style={{opacity: '1'}}><span id="pickuptime" style={{color: 'var(--white)'}}>05:58 PM</span> <i className="fa fa-clock-o"></i></label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="timeline">
									<div className="timeline-content">
										<div className="description return">
											<div className="form-group">
												<label>Return</label>
												<input type="text" className="form-control" placeholder="Enter location " />
											</div>
											<div className="form-group">
												<input type="hidden" id="returndatepicker" />
												<div className="form-inline" onclick="$('#returndatepicker').datetimepicker({allowTimes:[]});$('#returndatepicker').datetimepicker('show');">
													<label style={{opacity: '1'}}><span id="returndate">17</span> <span id="returnmonth" style={{color: 'var(--white)'}}>Nov</span> <i className="fa fa-calendar"></i></label>
													<label style={{opacity: '1'}}><span id="returntime" style={{color: 'var(--white)'}}>05:58 PM</span> <i className="fa fa-clock-o"></i></label>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="timeline">
									<div className="timeline-content">
										<div className="description text-center">
											<div className="form-group">
												<div className="form-inline">
													<div className="btn-group btn-group-vertical" data-toggle="buttons">
														<label className="btn active" style={{opacity: '1'}}>
														  <input type="checkbox" name='rental_period' checked /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i> <span> Apply corporate rate </span>
														</label>
													</div>
												</div>
											</div>
											<div className="form-group">
												<button className="btn show-offer-btn" onclick="window.location.href='offers.html'"><i className="fa fa-search"></i> Show Offers</button>
											</div>
										</div>
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

export default FilterForm;