// import { Card } from 'antd';
import React from 'react'
// import { Link } from "react-router-dom";

import HomeNavbar from './HomeNavbar';
import Introduction from './Introduction';
import CoursesCard from './CoursesCard';
import NewCourseCard from './NewCourseCard';
import HomeDashboard from './HomeDashboard';
import Mantra from './Mantra';
import OurTeam from './OurTeam';
import HomeFAQ from './HomeFAQ';
import Footer from './Footer';
import './index.scss';

const MainHome = () => {

    return (
        <div className="client-mainHome-container">
            <HomeNavbar />
            <Introduction />
            {/* <CoursesCard /> */}
            <NewCourseCard />
            
            <div className="client-mainHome-subcontainer">
                <HomeDashboard />
                <Mantra />
                <OurTeam />
                <HomeFAQ />
            </div>

            <Footer />
        </div>
    )
}

export default MainHome
