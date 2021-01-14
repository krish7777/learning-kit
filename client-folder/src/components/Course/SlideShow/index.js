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
  { steps, codeStepStart, finalCircuitStep, toggleSide, showSide, changeStep, rightText, changeCurrentStep }
) => {


  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const inputEl = useRef(null);

  const [codeModalIsOpen, setCodeModalIsOpen] = useState(false);
  const [startModalIsOpen, setStartModalIsOpen] = useState(false);

  const closePrevExpModal = () => {
    setStartModalIsOpen(false);
  };
  const closeCodeModal = () => {
    setCodeModalIsOpen(false);
  };

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
      inputEl.current.slideToIndex(codeStepStart - 1);
    else if (finalCircuitStep)
      inputEl.current.slideToIndex(finalCircuitStep - 1);

  };

  const goLeft = () => {
    inputEl.current.slideToIndex(currentStep - 1 === -1 ? 0 : currentStep - 1);
  };

  const goRight = () => {
    inputEl.current.slideToIndex(
      currentStep + 1 === steps.length ? currentStep : currentStep + 1
    );
    if (currentStep + 1 === steps.length) {
      changeCurrentStep('Experiment')
    }
  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }


  const modalChecker = (x) => {
    onSlide(x)
    if (codeStepStart && x === codeStepStart - 1 && currentStep === codeStepStart - 2) {
      setCodeModalIsOpen(true);

      setTimeout(() => {
        setCodeModalIsOpen(false);
      }, 1500);
    }

  };


  return (
    <div className="slideshow" style={showSide ? { width: "65%" } : { width: "65%", margin: "0 20%" }}>
      <div style={{ background: "white" }}>
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
      </div>

      <div className="code-step">
        Step {currentStep + 1} : {steps[currentStep].description}
      </div>
      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />
        </div>
        <div className="divider"></div> {/* Divider Here */}
        <div onClick={skipToCode} className="skip-btn">
          <SkipIcon />
          SKIP TO {codeStepStart ? "CODE" : "FINAL CIRCUIT"}
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

      <Modal
        title=""
        visible={startModalIsOpen}
        footer={[]}
        closable={false}
        style={{ textAlign: "center" }}
      >
        <h1>LET'S BEGIN</h1>
      </Modal>
      <Modal
        title=""
        visible={codeModalIsOpen}
        footer={[]}
        closable={false}
        style={{ textAlign: "center" }}

      >
        <h1>LET'S START CODING</h1>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  expSteps: state.courseReducer.currentExpSteps,
  showSide: state.courseReducer.showSide
})

const mapDispatchToProps = dispatch => ({
  toggleSide: bindActionCreators(toggleSide, dispatch),
  changeStep: bindActionCreators(changeStep, dispatch),
  changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
