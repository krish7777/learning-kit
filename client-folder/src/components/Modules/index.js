import React from "react";
import "./styles.scss";
import { Button } from "antd";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllModules } from "../Home/action";


class Modules extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getAllModules(this.props.match.params.type)
  }

  render() {
    const { allModules } = this.props;
    console.log(allModules)
    return (

      allModules.map((module, index) => (
        <div className="module">
          <div className="module-heading">
            <h1>
              Module {index + 1} : {module.name}
            </h1>
            <svg
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37.5"
                cy="37.5"
                r="32.5"
                stroke="url(#paint0_linear)"
                stroke-opacity="0.9"
                stroke-width="10"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="37.5"
                  y1="38"
                  x2="37.5"
                  y2="75"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#6BD302" />
                  <stop offset="1" stop-color="#FF7456" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="module-body">
            {/* <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. ullamco est sit aliqua
          dolor do amet sint. Velit officia consequat duis enim velit mollit.
          Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non
          deserunt ullamco est sit aliqua dolor do amet sint. ullamco est sit
          aliqua dolor do amet sint.
        </p>
        <p>
          Link to study material -{" "}
          <a href="https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/">
            https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/
          </a>
        </p>
        <p>
          Link to study material -{" "}
          <a href="https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/">
            https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/
          </a>
        </p> */}

            <div dangerouslySetInnerHTML={{ __html: module.introduction }}></div>

            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container-with-dots"
              dotListClass=""
              draggable
              focusOnSelect={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024
                  },
                  items: 4,
                  partialVisibilityGutter: 40
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0
                  },
                  items: 2,
                  partialVisibilityGutter: 30
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464
                  },
                  items: 3,
                  partialVisibilityGutter: 30
                }
              }}
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >

              {module.courses.map((course, index) => (
                <Link to={`/${this.props.match.params.type}/course/${course._id}`}>
                  <div className="course-slider">
                    <img src={course.thumbnailPath} alt="Thumbnail"></img>
                    <p>{index + 1}. {course.name}</p>
                  </div>
                </Link>
              ))}
            </Carousel>
            {module.courses.length ? <Link to={`/${this.props.match.params.type}/course/${module.courses[0]._id}`} >
              <Button size={"large"} style={{ backgroundColor: "#56AC00", fontSize: "20px", fontWeight: "600", marginTop: "50px", padding: "10px 50px", display: "flex", alignItems: "center" }}>Start from first</Button>
            </Link> : null}


          </div>
        </div>
      ))

    );
  }
};

const mapStateToProps = (state) => ({
  allModules: state.homeReducer.allModules
})

const mapDispatchToProps = (dispatch) => ({
  getAllModules: bindActionCreators(getAllModules, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Modules);
