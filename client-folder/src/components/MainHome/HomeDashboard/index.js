import React, { Component } from 'react';
import { Carousel } from 'antd';
import './styles.scss';

import Sample1 from './sample1.jpg';
import Sample2 from './sample2.jpg';
import Sample3 from './sample3.jpg';
import Sample4 from './sample4.jpg';
import Sample5 from './sample5.jpg';

class HomeDashboard extends Component {


    render() {

        return (
            <div className="client-mainHome-homeDashboard">
                <div className="client-homeDashboard-container">
                    <div className="client-homeDashboard-image">
                        <Carousel autoplay>
                            <div className="client-homeDashoard-carousel-content">
                                <img src={Sample1}></img>
                            </div>
                            <div className="client-homeDashoard-carousel-content">
                                <img src={Sample2}></img>
                            </div>
                            <div className="client-homeDashoard-carousel-content">
                                <img src={Sample3}></img>
                            </div>
                            <div className="client-homeDashoard-carousel-content">
                                <img src={Sample4}></img>
                            </div>
                            <div className="client-homeDashoard-carousel-content">
                                <img src={Sample5}></img>
                            </div>
                        </Carousel>
                    </div>
                </div>
                {/* <div className="client-mainHome-homeDashoard-title">
                        Dashboard.
                </div> */}
            </div>
        )
    }
}

export default HomeDashboard;