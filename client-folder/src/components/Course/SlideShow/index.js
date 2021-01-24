import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../../assets/images/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../../../assets/images/RightArrow.svg"
import { ReactComponent as SkipIcon } from "../../../assets/images/SkipIcon.svg"
import { ReactComponent as HideIcon } from "../../../assets/images/HideIcon.svg"
import { bindActionCreators } from "redux";
import { changeCurrentStep, changeStep, toggleSide } from "../action";
import Modal from "antd/lib/modal/Modal";

const SlideShow = (
  { steps, codeStepStart, toggleSide, showSide, changeStep, rightText, changeCurrentStep, type, currentCourse }
) => {


  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const inputEl = useRef(null);

  const [codeModalIsOpen, setCodeModalIsOpen] = useState(false);
  const [startModalIsOpen, setStartModalIsOpen] = useState(false);
  const [finalOverlayIsOpen, setFinalOverlayIsOpen] = useState(false);

  const urlify = (text) => {
    console.log("called")
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }
  useEffect(() => {
    const img = [];
    for (let i = 0; i < steps.length; i++) {
      img.push({ original: steps[i].imagePath });
    }
    setStartModalIsOpen(true);
    setTimeout(() => {
      setStartModalIsOpen(false);
    }, 1500);
    setImages(img);

  }, [steps]);

  const skipToCode = () => {
    if (codeStepStart)
      inputEl.current.slideToIndex(codeStepStart - 2);
    else
      inputEl.current.slideToIndex(steps.length - 1);

  };

  const goLeft = () => {
    if (codeModalIsOpen) {
      setCodeModalIsOpen(false)
    } else if (finalOverlayIsOpen) {
      setFinalOverlayIsOpen(false)
    }
    else {
      inputEl.current.slideToIndex(currentStep - 1 === -1 ? 0 : currentStep - 1);
    }
  };

  const goRight = () => {
    if (codeModalIsOpen) {
      setCodeModalIsOpen(false)
      inputEl.current.slideToIndex(
        currentStep + 1 === steps.length ? currentStep : currentStep + 1
      );
    } else if (codeStepStart && currentStep === codeStepStart - 2) {
      setCodeModalIsOpen(true);
    }
    else {
      inputEl.current.slideToIndex(
        currentStep + 1 === steps.length ? currentStep : currentStep + 1
      );
      if (currentStep + 1 === steps.length) {
        if (finalOverlayIsOpen) {
          currentCourse.simulation ?
            changeCurrentStep('Simulation') : changeCurrentStep('Experiment')
        }
        else {
          setFinalOverlayIsOpen(true)
        }
      }
    }

  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }


  const modalChecker = (x) => {
    onSlide(x)
    // if (codeStepStart && x === codeStepStart - 1 && currentStep === codeStepStart - 2) {
    //   setCodeModalIsOpen(true);
    // }

  };


  return (
    <div className="slideshow" style={showSide ? { width: "65%" } : { width: "80%", margin: "auto" }}>
      <div style={{ background: "white" }} className={codeModalIsOpen || finalOverlayIsOpen ? "overlayed " : ""}>
        <ImageGallery
          ref={inputEl}
          items={images}
          infinite={false}
          showThumbnails={false}
          showPlayButton={false}
          showIndex={true}
          showFullscreenButton={false}
          showNav={false}
          onBeforeSlide={modalChecker}
        />
        {codeModalIsOpen &&
          <div className="overlay-content">
            <span>You have successfully build the circuit, now let's write the code required to perform this experiment</span>
          </div>
        }

        {finalOverlayIsOpen && type == 'arduino' &&
          <div className="overlay-content">
            <span>You have successfuly completed the code required to do this experiment. Now upload the code to the Arduino Uno board and lets get started with the experiment.</span>
            {/* <Link to="/" onClick={(event) => event.preventDefault()}> */}
            <span onClick={() => changeCurrentStep('Introduction')} style={{ color: "#0C6A9F", fontSize: "medium", cursor: "pointer" }}> HINT: How to upload IDE code to Arduino board</span>
            {/* </Link> */}
          </div>
        }

        {finalOverlayIsOpen && type == 'digital' &&
          <div className="overlay-content">
            <span>You have successfuly built the circuit. Now lets start the experiment.</span>
          </div>}
      </div>

      <div dangerouslySetInnerHTML={{ __html: ` Step ${currentStep + 1} : ${urlify(steps[currentStep].description)}` }} className={codeModalIsOpen || finalOverlayIsOpen ? "overlayed code-step" : "code-step"}>

      </div>
      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />
        </div>
        <div className="divider"></div> {/* Divider Here */}
        <div onClick={skipToCode} className="skip-btn">
          <SkipIcon />
          SKIP TO {codeStepStart ? "FINAL CIRCUIT" : "FINAL CIRCUIT"}
        </div>
        <div className="divider"></div> {/* Divider Here */}
        <div onClick={toggleSide} className="hide-btn">
          <HideIcon />
          {rightText}
        </div>
        <div className="divider"></div> {/* Divider Here */}
        <div onClick={goRight} className="right-arrow">
          <RightArrow />
        </div>
      </div>

      {/* <Modal
        title=""
        visible={startModalIsOpen}
        footer={[]}
        closable={false}
        style={{ textAlign: "center" }}
      >
        <h1>LET'S BEGIN</h1>
      </Modal> */}
      {/* <Modal
        title=""
        visible={codeModalIsOpen}
        footer={[]}
        closable={false}
        style={{ textAlign: "center" }}

      >
        <h1>LET'S START CODING</h1>
      </Modal> */}
    </div>
  );
};

const mapStateToProps = state => ({
  expSteps: state.courseReducer.currentExpSteps,
  showSide: state.courseReducer.showSide,
  currentCourse: state.courseReducer.currentCourse
})

const mapDispatchToProps = dispatch => ({
  toggleSide: bindActionCreators(toggleSide, dispatch),
  changeStep: bindActionCreators(changeStep, dispatch),
  changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
