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
import { toggleImages, changeExpStep } from "../action";
import Modal from "antd/lib/modal/Modal";

const SlideShow = (
  { noOfSteps, expNo, expSteps, simulationStepStart, toggleImages, showImages, currentStep, setCurrentStep }
) => {


  const [images, setImages] = useState([]);
  // const [currentStep, setCurrentStep] = useState(0);
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
    for (let i = 0; i < noOfSteps; i++) {
      img.push({ original: require(`../../../assets/images/exp${expNo}/ckt${i + 1}.png`) });
    }
    setStartModalIsOpen(true);
    setTimeout(() => {
      setStartModalIsOpen(false);
    }, 1500);
    setImages(img);

  }, [noOfSteps, expNo]);

  const skipToCode = () => {
    inputEl.current.slideToIndex(simulationStepStart);
  };

  const goLeft = () => {
    inputEl.current.slideToIndex(currentStep - 1 === -1 ? 0 : currentStep - 1);
  };

  const goRight = () => {
    inputEl.current.slideToIndex(
      currentStep + 1 === noOfSteps ? currentStep : currentStep + 1
    );
  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
  }


  const modalChecker = (x) => {
    onSlide(x)
    if (x === simulationStepStart + 1 && currentStep === simulationStepStart) {
      setCodeModalIsOpen(true);

      setTimeout(() => {
        setCodeModalIsOpen(false);
      }, 1500);
    }
  };


  return (
    <div className="slideshow" style={showImages ? { width: "70%" } : { width: "80%", margin: "0 10%" }}>
      <div>
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
        Step {currentStep + 1} : {expSteps[currentStep]}
      </div>
      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />

        </div>
        <div className="divider"></div>
        <div onClick={skipToCode} className="skip-btn">
          <SkipIcon />
          SKIP TO SIMULATION
        </div>
        <div className="divider"></div>

        <div onClick={toggleImages} className="hide-btn">
          <HideIcon />
          HIDE IMAGES
        </div>
        <div className="divider"></div>

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
        <h1>WIRING COMPLETED!.LET'S SIMULATE</h1>
      </Modal>
    </div >
  );
};

const mapStateToProps = state => ({
  expSteps: state.digitalExperimentReducer.currentExpSteps,
  simulationStepStart: state.digitalExperimentReducer.simulationStepStart,
  showImages: state.digitalExperimentReducer.showImages,
  currentStep: state.digitalExperimentReducer.stepNo
})

const mapDispatchToProps = dispatch => ({
  toggleImages: bindActionCreators(toggleImages, dispatch),
  setCurrentStep: bindActionCreators(changeExpStep, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
