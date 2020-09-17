import React from "react";
import "./styles.scss";
import { Button } from "antd";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

import Thumbnail from "../../assets/images/thumbnail.png"
import { Link } from "react-router-dom";


const Module = (props) => {
  return (
    <div className="module">
      <div className="module-heading">
        <h1>
          Module {props.moduleNo} : {props.moduleName}
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
        <p>
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
        </p>

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

          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>1. Breadboard</p>
          </div>
          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>2. Logic Generator</p>
          </div>
          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>3. Logic Monitor</p>
          </div>
          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>4. LED Blinker</p>
          </div>
          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>5. BreadBoard</p>
          </div>
          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>6. Breadboard</p>
          </div>
          <div className="course-slider">
            <img src={Thumbnail}></img>
            <p>7. Breadboard</p>
          </div>
        </Carousel>
        <Link to="/experiment">
          <Button size={"large"} style={{ backgroundColor: "#56AC00", fontSize: "20px", fontWeight: "600", marginTop: "50px", padding: "10px 50px", display: "flex", alignItems: "center" }}>Start from first</Button>
        </Link>

      </div>
    </div>
  );
};

export default Module;
