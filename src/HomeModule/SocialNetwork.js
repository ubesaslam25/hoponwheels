import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
class SocialNetwork extends Component {
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
            <div className="videos-social-box car m-t-lg-90 p-t-sm-35 m-b-lg-20">
                <div className="row">
                    <div className="col-lg-6 section-videos">
                        <h3>Featured videos</h3>
                        <div className="video-box">
                            <div className="video-box-thumbnail" style={{backgroundImage: 'url(assets/images/video-box-1.png)'}}>
                                <div className="video-box-overlay"></div>
                                <span className="video-box-overlay-icon"><i className="fa fa-play"></i></span>
                            </div>	
                            <div className="video-box-caption">
                                <div className="title">The indomitable spirit - Arunima Sinha</div>
                                <div className="underline">&nbsp;</div>
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="video-box">
                            <div className="video-box-thumbnail" style={{backgroundImage:' url(assets/images/video-box-2.png)'}}>
                                <div className="video-box-overlay"></div>
                                <span className="video-box-overlay-icon"><i className="fa fa-play"></i></span>
                            </div>		
                            <div className="video-box-caption">
                                <div className="title">The indomitable spirit - Arunima Sinha</div>
                                <div className="underline">&nbsp;</div>
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="video-box">
                            <div className="video-box-thumbnail" style={{backgroundImage: 'url(assets/images/video-box-3.png)'}}>
                                <div className="video-box-overlay"></div>
                                <span className="video-box-overlay-icon"><i className="fa fa-play"></i></span>
                            </div>		
                            <div className="video-box-caption">
                                <div className="title">The indomitable spirit - Arunima Sinha</div>
                                <div className="underline">&nbsp;</div>
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="col-lg-6 section-social">
                        <h3>We in social media</h3>
                        <div className="social-box">
                            <div className="social-box-thumbnail" style={{backgroundImage: 'url(assets/images/social-box-1.png)'}}>
                                <div className="social-box-overlay-icon">
                                    <img src="assets/images/icons/instagram.svg" alt="" />
                                    <span>4 days ago</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>	
                            <div className="social-box-caption">
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="social-box">
                            <div className="social-box-thumbnail" style={{backgroundImage: 'url(assets/images/social-box-2.png)'}}>
                                <div className="social-box-overlay-icon">
                                    <img src="assets/images/icons/youtube.svg" alt="" />
                                    <span>4 days ago</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>	
                            <div className="social-box-caption">
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="social-box">
                            <div className="social-box-thumbnail" style={{background: '#E7E7E7 0% 0% no-repeat padding-box'}}>
                                <div className="social-box-overlay-icon-center">
                                    <img src="assets/images/icons/twitter.svg" alt="" />
                                    <figcaption>4 days ago</figcaption>
                                </div>
                            </div>
                            <div className="social-box-caption">
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="social-box">
                            <div className="social-box-thumbnail" style={{backgroundImage: 'url(assets/images/social-box-3.png)'}}>
                                <div className="social-box-overlay-icon">
                                    <img src="assets/images/icons/facebook.svg" alt="" />
                                    <span>4 days ago</span>
                                </div>
                                <div className="clearfix"></div>
                            </div>	
                            <div className="social-box-caption">
                                <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>	
            </div>	
        )
    }
}

export default SocialNetwork;