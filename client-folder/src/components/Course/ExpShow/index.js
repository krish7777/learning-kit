import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { Link } from 'react-router-dom'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../../assets/images/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../../../assets/images/RightArrow.svg"
import { ReactComponent as SkipIcon } from "../../../assets/images/SkipIcon.svg"
import { ReactComponent as TroubleshootIcon } from "../../../assets/images/TroubleshootIcon.svg"
import { bindActionCreators } from "redux";
import { changeCurrentStep, changeStep } from "../action";

const SlideShow = (
  { steps, changeStep, changeCurrentStep, overlayUnread, setOverlayUnread, isGettingStarted }
) => {


  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const inputEl = useRef(null);
  const [overlayIsOpen, setOverlayIsOpen] = useState(overlayUnread);

  useEffect(() => {
    const img = [];
    for (let i = 0; i < steps.length; i++) {
      img.push({ original: steps[i].imagePath });
    }
    // setStartModalIsOpen(true);
    // setTimeout(() => {
    //   setStartModalIsOpen(false);
    // }, 1500);
    setImages(img);

  }, [steps]);

  const skipToCode = (index) => {
    inputEl.current.slideToIndex(index);
  };

  const closeOverlay = () => {
    setOverlayIsOpen(false);
    setOverlayUnread()
  };

  const goLeft = () => {
    inputEl.current.slideToIndex(currentStep - 1 === -1 ? 0 : currentStep - 1);
  };

  const goRight = () => {
    inputEl.current.slideToIndex(
      currentStep + 1 === steps.length ? currentStep : currentStep + 1
    );
  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }

  const modalChecker = (x) => {
    onSlide(x)
  };

  return (
    <div className="expshow-slideshow" >
      <div style={{ background: "white" }} className={overlayIsOpen ? "overlayed gallerycontainer" : "gallerycontainer"}>
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
        {overlayIsOpen &&
          <div className="overlay-content">
            <span>You have successfuly completed the code required to do this experiment. Now upload the code to the Arduino Uno board and lets get started with the experiment.</span>
            <Link to="/" onClick={(event) => event.preventDefault()}>
              <span style={{ color: "#0C6A9F", fontSize: "medium" }}> HINT: How to upload IDE code to Arduino board</span></Link>
          </div>
        }
      </div>

      <div className={overlayIsOpen ? "overlayed code-step" : "code-step"} style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
        Step {currentStep + 1} : {steps[currentStep].description}
      </div>

      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />
        </div>
        <div className="divider"></div> {/* Divider Here */}
        {overlayIsOpen &&
          <>
            <div onClick={closeOverlay} className="codeUp-btn">
              <SkipIcon />
            CODE UPLOAD SUCCESSFUL
            </div>
            <div className="divider"></div> {/* Divider Here */}
          </>
        }
        {!overlayIsOpen && !isGettingStarted &&
          <div onClick={() => { changeCurrentStep('Troubleshoot') }} className="troubleshoot-btn">
            <TroubleshootIcon />
          TROUBLESHOOT
        </div>
        }
        {isGettingStarted &&
          <div style={{
            width: "100%"
          }}></div>}
        <div className="divider"></div> {/* Divider Here */}
        <div onClick={goRight} className="right-arrow">
          <RightArrow />
        </div>
      </div>

    </div>
  );
};

const mapStateToProps = state => ({
  expSteps: state.courseReducer.currentExpSteps,
})

const mapDispatchToProps = dispatch => ({
  changeStep: bindActionCreators(changeStep, dispatch),
  changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
