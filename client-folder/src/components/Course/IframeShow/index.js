import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../../assets/images/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../../../assets/images/RightArrow.svg"
import { ReactComponent as SkipIcon } from "../../../assets/images/SkipIcon.svg"
import { ReactComponent as TroubleshootIcon } from "../../../assets/images/TroubleshootIcon.svg"
import { ReactComponent as HideIcon } from "../../../assets/images/HideIcon.svg"
import { bindActionCreators } from "redux";
import { changeCurrentStep, changeStep } from "../action";

const IframeShow = (
  { steps, changeStep, simulation, changeCurrentStep, overlayUnread, setOverlayUnread, isGettingStarted, finalMessage }
) => {


  const [iFrame, setIframe] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [overlayIsOpen, setOverlayIsOpen] = useState(overlayUnread);
  const [finalOverlayIsOpen, setFinalOverlayIsOpen] = useState(false);

  useEffect(() => {
    const ifr = simulation || "";
    setIframe(ifr);

  }, [steps]);

  const closeOverlay = () => {
    setOverlayIsOpen(false);
    setOverlayUnread();
  };

  const goLeft = () => {
    onSlide(currentStep - 1 === -1 ? 0 : currentStep - 1);
  };

  const goRight = () => {
    if (overlayIsOpen) {
      setOverlayIsOpen(false);
      setOverlayUnread();
    }
    else {
      onSlide(
        currentStep + 1 === steps.length ? currentStep : currentStep + 1
      );
      if (currentStep + 1 === steps.length) {
        if (finalOverlayIsOpen)
          changeCurrentStep('ResultsAnalysis')
        else {
          setFinalOverlayIsOpen(true)
          // TODO: EXPERIMENT FORM OPEN ON THE RIGHT
        }
      }
    }

  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }

  return (
    <div className="iframeShow-slideshow">
      <div className={overlayIsOpen || finalOverlayIsOpen ? "overlayed gallerycontainer" : "gallerycontainer"}>
        <div className="resp-container">
          <iframe className="resp-iframe" src={iFrame} allowfullscreen></iframe>
          {/* media query TODO */}
        </div>
        {/* <div class="wrap">
            <iframe className="frame" src={iFrame}></iframe>
        </div> */}
        {overlayIsOpen &&
          <div className="overlay-content">
            <span>You have successfuly built the circuit. Now lets start the experiment.</span>
          </div>
        }
        {finalOverlayIsOpen &&
          <div className="overlay-content">
            <span>{finalMessage}</span>
          </div>
        }
      </div>

      <div className={overlayIsOpen || finalOverlayIsOpen ? "overlayed code-step" : "code-step"}>
        Step {currentStep + 1} : {steps[currentStep].description}
      </div>

      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />

        </div>
        <div className="divider"></div>

        {!isGettingStarted &&
          <div onClick={() => { changeCurrentStep('Troubleshoot') }} className="troubleshoot-btn">
            <TroubleshootIcon />
          TROUBLESHOOT
        </div>
        }
        {isGettingStarted &&
          <div style={{
            width: "100%"
          }}></div>}
        <div className="divider"></div>

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

export default connect(mapStateToProps, mapDispatchToProps)(IframeShow);
