import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../../../assets/images/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../../../../assets/images/RightArrow.svg"
import { bindActionCreators } from "redux";
import { changeCurrentStep, changeStep } from "../../action";

const SlideShow = (
  { steps, changeStep, experimentCurrStep, setExperimentStep }
) => {


  const [images, setImages] = useState([]);
  const [simulations, setSimulations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const inputEl = useRef(null);

  useEffect(() => {
    const img = [];
    const sim = [];
    for (let i = 0; i < steps.length; i++) {
        if(steps[i].imagePath){
            img.push({ original: steps[i].imagePath });
            sim.push("");
        }
        else if(steps[i].simulationLink){
            img.push({original:""});
            sim.push(steps[i].simulationLink);
        }
        else{
            img.push({original:""});
            sim.push("");
        }
    }
    setImages(img);
    setSimulations(sim);
    inputEl.current.slideToIndex(experimentCurrStep)
  }, [steps]);


  const goLeft = () => {
    inputEl.current.slideToIndex(currentStep - 1 === -1 ? 0 : currentStep - 1);
  };

  const goRight = () => {
    inputEl.current.slideToIndex(
      currentStep + 1 === steps.length ? currentStep : currentStep + 1
    );
  };

  const onSlide = (slideNo) => {
    setExperimentStep(slideNo)
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }

  const modalChecker = (x) => {
    onSlide(x)
  };
  const dispCheck = () => {
    if (images[currentStep])
    return !images[currentStep].original?"none":"block";
    return "";
  };
  return (
    <div className="expshow-slideshow">
      <div style={{ background: "white" }} className={"gallerycontainer"}>
            <div className="img_container" style={{display:dispCheck(),height:"100%"}}>
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
        {!images[currentStep]?.original&&
        <div className="iframe_container" style={{width:"100%",height:"100%"}}>
            <iframe className="resp-iframe2" src={simulations[currentStep]} allowFullScreen></iframe>
        </div>
        }

      </div>

      <div className={"code-step"} style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
        Step {currentStep + 1} : {steps[currentStep].description}
      </div>

      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />
        </div>
        <div className="divider"></div>
          <div className="troubleshoot-btn">
            CONTACT TEACHER
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
