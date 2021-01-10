import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

class NewCourseCard extends Component {


    render() {
        return (
            <div className="client-mainHome-newCourseCard-container">
                <div className="newCourseCard-subContainer">

                    <div className="newCourseCard">
                        <div className="card-course-container">
                            <div className="card-course-title"><span>Arduino Robotics</span></div>
                            <div className="card-course-pointer-container">
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">30+ Experiment Tutorials</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Hands on Experiment Kit</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Teacher Support for Doubts</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Certificate (e-varifiiable)</div>
                                </div>
                            </div>
                            <Link to="/arduino">
                                <div className="card-course-button">
                                    <span>View Course Page</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="newCourseCard">
                        <div className="card-course-container">
                            <div className="card-course-title"><span>Basic Electronics</span></div>
                            <div className="card-course-pointer-container">
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">30+ Experiment Tutorials</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Hands on Experiment Kit</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Teacher Support for Doubts</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Certificate (e-varifiiable)</div>
                                </div>
                            </div>
                            <Link to="/digital">
                                <div className="card-course-button">
                                    <span>View Course Page</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="newCourseCard">
                        <div className="card-course-container">
                            <div className="card-course-title"><span>Digital Electronics</span></div>
                            <div className="card-course-pointer-container">
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">30+ Experiment Tutorials</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Hands on Experiment Kit</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Teacher Support for Doubts</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Certificate (e-varifiiable)</div>
                                </div>
                            </div>
                            <Link to="/">
                                <div className="card-course-button">
                                    <span>View Course Page</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="newCourseCard">
                        <div className="card-course-container">
                            <div className="card-course-title"><span>Op-Amp Electronics</span></div>
                            <div className="card-course-pointer-container">
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">30+ Experiment Tutorials</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Hands on Experiment Kit</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Teacher Support for Doubts</div>
                                </div>
                                <div className="card-course-pointers">
                                    <div className="pointer-tickmark">✔</div>
                                    <div className="pointer-data">Certificate (e-varifiiable)</div>
                                </div>
                            </div>
                            <Link to="/">
                                <div className="card-course-button">
                                    <span>View Course Page</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default NewCourseCard;