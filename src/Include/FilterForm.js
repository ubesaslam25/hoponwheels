import React, { Component } from 'react';
//import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { DatePickerComponent, TimePickerComponent } from '@syncfusion/ej2-react-calendars';
// import TimeKeeper from 'react-timekeeper'; //https://catc.github.io/react-timekeeper/#custom-styles
import ReactTooltip from "react-tooltip";
//const domainUrl = "http://localhost/hoponwheels/";
const domainUrl = "http://yotour.in/hoponwheels/";
const cityApi = "api/city";
const pickupApi = "api/location/pickup";
const returnApi = "api/location/dropoff";
var $ = require( "jquery" );
const split = require('split-string');
//const navPath = '/reactapp/';
const navPath = '/';

class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
			records: [],
			pickupRecords: [],
			returnRecords: [],
			rental_area: '',
			rental_period: 'short',
			rental_period_class: 'active',
			select_vehicle: 1,
			pickup_location: '',
			return_location: '',
			apply_corporate_rate: 0,
			formFields: []
		};
		if(window.location.pathname === navPath){
			localStorage.removeItem('result');
		}
		//window.location.reload(false);
		//this.state.postdata = JSON.parse(localStorage.getItem('result'));
		this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handlePickupDropoff = this.handlePickupDropoff.bind(this);
    }
    
    async componentDidMount() {
		let currentDate = new Date();
		let currentDay = split(currentDate.toString(),{ separator: ' ' })[2];
		let currentMonth = split(currentDate.toString(),{ separator: ' ' })[1];
		$(".pickupdate").html(currentDay);
		$(".pickupmonth").html(currentMonth);
		$(".returndate").html(currentDay);
		$(".returnmonth").html(currentMonth);
		let time = split(split(currentDate.toString(),{ separator: ' ' })[4].toString(), { separator: ':' });
		let ampm = time[0] < 12 ? 'AM' : 'PM';
		let hour = time[0] % 12 || 12;
		$(".pickuptime").html(hour+':'+time[1]+' '+ampm);
		$(".returntime").html(hour+':'+time[1]+' '+ampm);
        const that = this; 
        const response = await fetch(domainUrl+cityApi);
        const data = await response.json();
        if(data.length > 1){
            that.setState({ records: data });
		}
		this.state.postdata = JSON.parse(localStorage.getItem('result'));
		//localStorage.setItem('pickup_location', this.state.postdata[2]);
		//console.log(this.state.postdata);
		const pickupResponse = await fetch(domainUrl+pickupApi);
        const pickupData = await pickupResponse.json();
        if(pickupData.length > 1){
            that.setState({ pickupRecords: pickupData });
		}
		const returnResponse = await fetch(domainUrl+returnApi);
        const returnData = await returnResponse.json();
        if(returnData.length > 1){
            that.setState({ returnRecords: returnData });
		}
		let rental_area_val = document.getElementsByName("rental_area").value;
		fetch(domainUrl+pickupApi+'/'+rental_area_val)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ pickupRecords: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
		fetch(domainUrl+returnApi+'/'+rental_area_val)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ returnRecords: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

	handleFilterSubmit = (e) => {
		e.preventDefault();
		let rental_area = this.state.rental_area;
		let rental_period = '';
		if($('#rental_period_short').hasClass('active')){
			rental_period = 'short';
		}else if($('#rental_period_long').hasClass('active')){
			rental_period = 'long';
		}
		let select_vehicle = this.state.select_vehicle;
		let pickup_location = this.state.pickup_location;
		let pickup_location_date_time = $('input[name=pickup_location_date]').val()+' '+$('input[name=pickup_location_time]').val();
		let return_location = this.state.return_location;
		let return_location_date_time = $('input[name=return_location_date]').val()+' '+$('input[name=return_location_time]').val();
		let apply_corporate_rate = this.state.apply_corporate_rate;
		let postData = {
			'rental_area':rental_area,
			'rental_period':rental_period,
			'select_vehicle':select_vehicle,
			'pickup_location':pickup_location,
			'pickup_location_date_time':pickup_location_date_time,
			'return_location':return_location,
			'return_location_date_time':return_location_date_time,
			'apply_corporate_rate':apply_corporate_rate
		};
		localStorage.setItem('result', JSON.stringify(postData));
		window.location.replace(navPath+"offers");
	}

	handleFilterChange = (e) => {
		const target = e.target;
		let nam = target.name;
		let val = target.value;
		this.setState({[nam]: val});
	}
	
	handlePickupDate = (e) => {
		const pickupdate = e.value;
		const pickupdateArray = split(pickupdate.toString(), { separator: ' ' });
		$(".pickupdate").html(pickupdateArray[2]);
		$(".pickupmonth").html(pickupdateArray[1]);
	}	
	
	handlePickupTime = (e) => {
		const pickuptime = e.value;
		const pickuptimeArray = split(pickuptime.toString(), { separator: ' ' });
		let time = split(pickuptimeArray[4].toString(), { separator: ':' });
		let ampm = time[0] < 12 ? 'AM' : 'PM';
		let hour = time[0] % 12 || 12;
		$(".pickuptime").html(hour+':'+time[1]+' '+ampm);
	}	

	handleReturnDate = (e) => {
		const returndate = e.value;
		const returndateArray = split(returndate.toString(), { separator: ' ' });
		$(".returndate").html(returndateArray[2]);
		$(".returnmonth").html(returndateArray[1]);
	}

	handleReturnTime = (e) => {
		const returntime = e.value;
		const returntimeArray = split(returntime.toString(), { separator: ' ' });
		let time = split(returntimeArray[4].toString(), { separator: ':' });
		let ampm = time[0] < 12 ? 'AM' : 'PM';
		let hour = time[0] % 12 || 12;
		$(".returntime").html(hour+':'+time[1]+' '+ampm);
	}

	handlePickupDropoff = (e) => {
		const target = e.target;
        const that = this; 
		let val = target.value;
		fetch(domainUrl+pickupApi+'/'+val)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ pickupRecords: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
		fetch(domainUrl+returnApi+'/'+val)
		.then(res => res.json())
		.then(
			(result) => {
				that.setState({ returnRecords: result });
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}

    render() {
		let getPostData = {
			'rental_area':'',
			'rental_period':'short',
			'select_vehicle':1,
			'pickup_location':'',
			'pickup_location_date_time':'',
			'return_location':'',
			'return_location_date_time':'',
			'apply_corporate_rate':0
		};
		if(JSON.parse(localStorage.getItem('result'))){
			getPostData = JSON.parse(localStorage.getItem('result'));
			let monthArray = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			this.pickupMonth = monthArray[split(split(getPostData['pickup_location_date_time'].toString(),{ separator: ' ' })[0].toString(),{ separator: '/' })[0]];
			this.pickupDay = split(split(getPostData['pickup_location_date_time'].toString(),{ separator: ' ' })[0].toString(),{ separator: '/' })[1];
			this.pickupTiming = split(getPostData['pickup_location_date_time'].toString(),{ separator: ' ' })[1]+' '+split(getPostData['pickup_location_date_time'].toString(),{ separator: ' ' })[2];
			$(".pickupdate").html(this.pickupDay);
			$(".pickupmonth").html(this.pickupMonth);
			$(".pickuptime").html(this.pickupTiming);
			// $("input[name=pickup_location_date]").val(split(getPostData['pickup_location_date_time'].toString(),{ separator: ' ' })[0]);
			// $("input[name=pickup_location_time]").val(this.pickupTiming);
			this.returnMonth = monthArray[split(split(getPostData['return_location_date_time'].toString(),{ separator: ' ' })[0].toString(),{ separator: '/' })[0]];
			this.returnDay = split(split(getPostData['return_location_date_time'].toString(),{ separator: ' ' })[0].toString(),{ separator: '/' })[1];
			this.returnTiming = split(getPostData['return_location_date_time'].toString(),{ separator: ' ' })[1]+' '+split(getPostData['return_location_date_time'].toString(),{ separator: ' ' })[2];
			$(".returndate").html(this.returnDay);
			$(".returnmonth").html(this.returnMonth);
			$(".returntime").html(this.returnTiming);
			// $("input[name=return_location_date]").val(split(getPostData['return_location_date_time'].toString(),{ separator: ' ' })[0]);
			// $("input[name=return_location_time]").val(this.returnTiming);
		}
		//console.log(getPostData);
		this.dateValue = new Date();
		this.getCity = this.state.records.map(function(finalData, index){
            return <option key={ index } value={ finalData.id } selected={Number(getPostData['rental_area']) === finalData.id}>{ finalData.name }</option>
		});
		this.getPickupLocation = this.state.pickupRecords.map(function(finalData, index){
			return <option key={ index } value={ finalData.id } selected={Number(getPostData['pickup_location']) === finalData.id}>{ finalData.location_name }</option>
		});
		this.getReturnLocation = this.state.returnRecords.map(function(finalData, index){
			return <option key={ index } value={ finalData.id } selected={Number(getPostData['return_location']) === finalData.id}>{ finalData.location_name }</option>
		});
		//console.log(getPostData);
		const { rental_area, pickup_location, return_location } = this.state;
		const isEnabled = rental_area.length > 0 && pickup_location.length > 0 && return_location.length > 0;
        return (
			<form onSubmit={this.handleFilterSubmit}>
				<div className="search-1 m-t-sm-40">
					<div className="container">
						<div className="search-option p-b-sm-30 p-r-sm-45 p-xs-15 custom-search-box">
							<div className="row">
								<div className="main-timeline">
									<div className="timeline">
										<div className="timeline-content">
											<div className="description">
												<div className="form-group">
													<label>Rental City</label>
													<select className="form-control" name="rental_area" onChange={e => { this.handleFilterChange(e); this.handlePickupDropoff(e) }}>
														<option>Select City</option>
														{this.getCity}
													</select>
												</div>
												<div className="form-group">
													<label>Rental Period</label>
													<div className="form-inline">
														<div className="btn-group btn-group-vertical" data-toggle="buttons">
															{(() => {
																switch (getPostData['rental_period']) {
																	case "short":
																		return <label id="rental_period_short" className={"btn active"} style={{opacity: '1'}} onClick={this.handleFilterChange} data-for="shortIn"
																		data-tip="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
																		data-iscapture="true"><input type="radio" name='rental_period' value="short" defaultChecked={"checked"} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Short-term </span>
																		</label>;
																	default:
																		return <label id="rental_period_short" className={(getPostData['rental_period'] === "short")?"btn active":"btn"} style={{opacity: '1'}} onClick={this.handleFilterChange} data-for="shortOut"
																		data-tip="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
																		data-iscapture="true"><input type="radio" name='rental_period' value="short" defaultChecked={this.state.rental_period === "short"} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i> <span> Short-term </span>
																		</label>;
																}
															})()}
															<ReactTooltip id="shortIn" multiline={true} />
															<ReactTooltip id="shortOut" multiline={true} />
															{(() => {
																switch (getPostData['rental_period']) {
																	case "long":
																		return <label id="rental_period_long" className="btn active" style={{opacity: '1'}} onClick={this.handleFilterChange} data-for="longIn"
																		data-tip="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
																		data-iscapture="true"><input type="radio" name='rental_period' value="long" defaultChecked={"checked"} /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Long-term</span>
																		</label>;
																	default:
																		return <label id="rental_period_long" className="btn" style={{opacity: '1'}} onClick={this.handleFilterChange} data-for="longOut"
																		data-tip="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
																		data-iscapture="true"><input type="radio" name='rental_period' value="long" /><i className="fa fa-circle-o fa-2x"></i><i className="fa fa-dot-circle-o fa-2x"></i><span> Long-term</span>
																		</label>;
																}
															})()}
															<ReactTooltip id="longIn" multiline={true} />
															<ReactTooltip id="longOut" multiline={true} />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="timeline">
										<div className="timeline-content">
											<div className="description text-center">
												<label className="vehicle-select-2 text-center layersMenu">
													{(() => {
														switch (getPostData['select_vehicle']) {
															case 1:
																return <input type="radio" name="select_vehicle" value="1" defaultChecked={"checked"} onChange={this.handleFilterChange} />;
															default:
																return <input type="radio" name="select_vehicle" value="1" onChange={this.handleFilterChange} />;
														}
													})()}
													<img src="assets/images/car-icon.png" width="64" alt="" />
													<figcaption className="text-center">Car</figcaption>
												</label>
												<div className="vehicle-select">
													<div className="vehicle-select-1 text-center"><span>Coming soon</span></div>
													<label className="vehicle-select-2 text-center layersMenu">
														{(() => {
															switch (getPostData['select_vehicle']) {
																case 2:
																	return <input type="radio" name="select_vehicle" value="1" defaultChecked={"checked"} onChange={this.handleFilterChange} />;
																default:
																	return <input type="radio" name="select_vehicle" value="1" onChange={this.handleFilterChange} />;
															}
														})()}
														<img src="assets/images/icons/surface.svg" width="64" alt="" />
														<figcaption className="text-center">Bicycle</figcaption>
													</label>
													
													<label className="vehicle-select-3 text-center layersMenu">
														{(() => {
															switch (getPostData['select_vehicle']) {
																case 3:
																	return <input type="radio" name="select_vehicle" value="1" defaultChecked={"checked"} onChange={this.handleFilterChange} />;
																default:
																	return <input type="radio" name="select_vehicle" value="1" onChange={this.handleFilterChange} />;
															}
														})()}
														<img src="assets/images/icons/bike.svg" width="64" alt="" />
														<figcaption className="text-center">Bike</figcaption>
													</label>

													<label className="vehicle-select-4 text-center layersMenu">
														{(() => {
															switch (getPostData['select_vehicle']) {
																case 4:
																	return <input type="radio" name="select_vehicle" value="1" defaultChecked={"checked"} onChange={this.handleFilterChange} />;
																default:
																	return <input type="radio" name="select_vehicle" value="1" onChange={this.handleFilterChange} />;
															}
														})()}
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
													<div className="form-inline">
														<div className="btn-group btn-group-vertical" data-toggle="buttons">
															<label className="btn active" style={{opacity: '1'}}>
															<input type="checkbox" name='doorstep_pickup' value="0" onChange={this.handleFilterChange} /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i> <span> Doorstep Pickup </span>
															</label>
														</div>
													</div>
													<select className="form-control" name="pickup_location" onChange={this.handleFilterChange}>
														<option>Select Location</option>
														{this.getPickupLocation}
													</select>
													{/* <GooglePlacesAutocomplete 
														apiKey="AIzaSyDEWv2phNEucxoajL9_UuBpSG7OLVVlUww"
														name="pickup_location"
														selectProps={{
															styles: {
															  input: (provided) => ({
																color: '#fe003c',
																backgroundColor: 'transparent',
															  }),
															  option: (provided) => ({
																color: '#fe003c',
																backgroundColor: 'transparent',
															  }),
															  singleValue: (provided) => ({
																color: '#fe003c',
																backgroundColor: 'transparent',
															  }),
															},
															name: {
																input: (provided) => ({
																	name: 'pickup_location'
																})
															}
														}}
    												/> */}
												</div>
												<div className="form-group">
													<DatePickerComponent value={(getPostData['pickup_location_date_time'] === "")?this.dateValue:split(getPostData['pickup_location_date_time'].toString(),{ separator: ' ' })[0]} name="pickup_location_date" onChange={this.handlePickupDate}></DatePickerComponent>
													<TimePickerComponent value={(getPostData['pickup_location_date_time'] === "")?this.dateValue:this.pickupTiming} name="pickup_location_time" onChange={this.handlePickupTime}></TimePickerComponent>
													{/* <TimeKeeper time={"4:45 PM"} switchToMinuteOnHourSelect={true} /> */}
													<div className="form-inline">
														<label style={{opacity: '1'}}><span className="pickupdate"></span> <span className="pickupmonth" style={{color: 'var(--white)'}}></span></label>
														<label style={{opacity: '1'}}><span className="pickuptime" style={{color: 'var(--white)'}}></span></label>
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
													<select className="form-control" name="return_location" onChange={this.handleFilterChange}>
														<option>Select Location</option>
														{this.getReturnLocation}
													</select>
													{/* <GooglePlacesAutocomplete 
														apiKey="AIzaSyDEWv2phNEucxoajL9_UuBpSG7OLVVlUww"
														name="return_location"
														selectProps={{
															styles: {
															  input: (provided) => ({
																color: '#fe003c',
																backgroundColor: 'transparent',
															  }),
															  option: (provided) => ({
																color: '#fe003c',
																backgroundColor: 'transparent',
															  }),
															  singleValue: (provided) => ({
																color: '#fe003c',
																backgroundColor: 'transparent',
															  }),
															},
														}}
    												/> */}
												</div>
												<div className="form-group">
													<DatePickerComponent value={(getPostData['return_location_date_time'] === "")?this.dateValue:split(getPostData['return_location_date_time'].toString(),{ separator: ' ' })[0]} name="return_location_date" onChange={this.handleReturnDate}></DatePickerComponent>
													<TimePickerComponent value={(getPostData['pickup_location_date_time'] === "")?this.dateValue:this.returnTiming} name="return_location_time" onChange={this.handleReturnTime}></TimePickerComponent>
													<div className="form-inline" onClick={this.handleReturn}>
														<label style={{opacity: '1'}}><span className="returndate"></span> <span className="returnmonth" style={{color: 'var(--white)'}}></span></label>
														<label style={{opacity: '1'}}><span className="returntime" style={{color: 'var(--white)'}}></span></label>
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
															<input type="checkbox" name='apply_corporate_rate' value="0" onChange={this.handleFilterChange} /><i className="fa fa-square-o fa-2x"></i><i className="fa fa-check-square-o fa-2x"></i> <span> Apply corporate rate </span>
															</label>
														</div>
													</div>
												</div>
												<div className="form-group">
													<button className="btn show-offer-btn" disabled={!isEnabled} type="submit"><i className="fa fa-search"></i> Show Offers</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
        )
    }
}

export default FilterForm;