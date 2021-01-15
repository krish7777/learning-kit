import React, { useState, useEffect } from "react";
import "./styles.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeCurrentStep, getCurrentCourse, removeCurrentCourse } from "./action";
import Introduction from "./Introduction";
import { Link } from "react-router-dom";
import BuildCircuit from "./BuildCircuit";
import Experiment from "./Experiment";
import ResultsAnalysis from "./ResultsAnalysis";
import Troubleshoot from "./Troubleshoot";
import Excercise from "./Excercise";
import ProgressBar from "./ProgressBar";
import { baseUrl } from "../../config";
import axios from "axios"


class Course extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentOrientation: 'landscape-primary',
      overlayUnread: true,
      isGettingStarted: false
    }

  }

  setCurrentOrientation = (orientation) => {
    this.setState({ currentOrientation: orientation })
  }

  setOverlayUnread = () => {
    console.log("the setoverlay main function called")
    this.setState({ overlayUnread: false })
  }



  // const [currentOrientation, setCurrentOrientation] = useState("landscape-primary");

  // useEffect(() => {

  //   getCurrentCourse(props.match.params.id)


  //   setCurrentOrientation(window.screen.orientation.type)
  //   function fullScreenCheck() {
  //     if (document.fullscreenElement) return;
  //     return document.documentElement.requestFullscreen();
  //   }
  //   function getOppositeOrientation() {
  //     const { type } = window.screen.orientation;
  //     return type.startsWith("portrait") ? "landscape" : "portrait";
  //   }

  //   // async function rotate(lockButton) {
  //   //   try {
  //   //     await fullScreenCheck();
  //   //   } catch (err) {
  //   //     console.error(err);
  //   //   }
  //   //   const newOrientation = getOppositeOrientation();
  //   //   await window.screen.orientation.lock(newOrientation);
  //   // }
  //   console.log("orientation", window.screen.orientation)
  //   // document.getElementById("button").addEventListener("click", rotate);


  // }, [])

  getOppositeOrientation = () => {
    const { type } = window.screen.orientation;
    return type.startsWith("portrait") ? "landscape" : "portrait";
  }

  rotate = async (lockButton) => {
    try {
      await this.fullScreenCheck();
    } catch (err) {
      console.error(err);
    }
    const newOrientation = this.getOppositeOrientation();
    await window.screen.orientation.lock(newOrientation);
  }

  fullScreenCheck = () => {
    if (document.fullscreenElement) {
      return this.closeFullscreen();
    }
    return document.documentElement.requestFullscreen();
  }

  // openFullscreen = () => {
  //   this.fullScreenCheck()
  // }

  closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }

  }

  componentDidMount() {
    axios.get(`${baseUrl}/api/course/getp/${this.props.match.params.id}`)
      .then(res => res.data)
      .then(data => {
        if (data.name == 'Getting Started') {
          this.setState({ overlayUnread: false, isGettingStarted: true })

          this.props.changeCurrentStep('Experiment')
        } else {
          this.props.changeCurrentStep('Introduction')
        }
      })
      .then(x => {
        this.props.getCurrentCourse(this.props.match.params.id)

      })
      .catch(err => {
        this.props.changeCurrentStep('Introduction')
      })

  }

  componentWillUnmount() {
    console.log("UNMOUNTING")
    this.props.removeCurrentCourse()
  }


  render() {
    // console.log("fdfsf");
    // console.log(this.props);
    const { currentStep, changeCurrentStep, currentCourse } = this.props;
    const { currentOrientation } = this.state;


    return (
      currentOrientation === "portrait-primary" ? <button id="button" onClick={this.rotate}>Please click to rotate the screen</button> :
        <div className="course">
          <div className="header">
            <Link to={`/${this.props.match.params.type}/modules`} style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 25H25V18.75H18.75V25ZM18.75 15.625H25V9.375H18.75V15.625ZM9.375 6.25H15.625V0H9.375V6.25ZM18.75 6.25H25V0H18.75V6.25ZM9.375 15.625H15.625V9.375H9.375V15.625ZM0 15.625H6.25V9.375H0V15.625ZM0 25H6.25V18.75H0V25ZM9.375 25H15.625V18.75H9.375V25ZM0 6.25H6.25V0H0V6.25Z"
                  fill="#9FB8CC"
                />
              </svg>
            </Link>
            <Link to={`/${this.props.match.params.type}`} style={{ display: "flex", alignItems: "center" }}>
              <svg
                width="30"
                height="25"
                viewBox="0 0 30 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7059 3.95588L22.0588 10.5735V22.0588H19.1176V13.2353H10.2941V22.0588H7.35294V10.5735L14.7059 3.95588ZM14.7059 0L0 13.2353H4.41176V25H13.2353V16.1765H16.1765V25H25V13.2353H29.4118L14.7059 0Z"
                  fill="#9FB8CC"
                />
              </svg>
            </Link>
            <p className="exp-name">
              {currentCourse ? currentCourse.name : null}
            </p>
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6784 0V2.93615C19.7976 4.16192 22.805 7.98176 22.805 12.5C22.805 17.0182 19.7976 20.8238 15.6784 22.0496V25C21.3797 23.703 25.6556 18.6003 25.6556 12.5C25.6556 6.39966 21.3797 1.29704 15.6784 0ZM19.2417 12.5C19.2417 9.97719 17.8164 7.81072 15.6784 6.75599V18.2013C17.8164 17.1893 19.2417 15.0086 19.2417 12.5ZM0 8.22406V16.7759H5.70125L12.8278 23.9025V1.09749L5.70125 8.22406H0Z"
                fill="#9FB8CC"
              />
            </svg>

            <div onClick={this.fullScreenCheck} style={{ cursor: "pointer" }}>
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.655762 0H9.58433V3.57143H4.22719V8.92857H0.655762V0ZM16.7272 0H25.6558V8.92857H22.0843V3.57143H16.7272V0ZM22.0843 16.0714H25.6558V25H16.7272V21.4286H22.0843V16.0714ZM9.58433 21.4286V25H0.655762V16.0714H4.22719V21.4286H9.58433Z"
                  fill="#9FB8CC"
                />
              </svg>
            </div>
          </div>
          {!this.state.isGettingStarted &&
            (
              <><div className="steps-bar">
                {currentCourse?.introduction ? <div onClick={() => changeCurrentStep('Introduction')} className={currentStep === "Introduction" ? "active" : ""}>INTRODUCTION </div> : null}
                {currentCourse?.buildCircuit ? <div onClick={() => changeCurrentStep('BuildCircuit')} className={currentStep === "BuildCircuit" ? "active" : ""}>BUILD CIRCUIT </div>
                  : null}
                {currentCourse?.experiment ? <div onClick={() => changeCurrentStep('Experiment')} className={currentStep === "Experiment" ? "active" : ""}>EXPERIMENT </div>
                  : null}

                {currentCourse?.results ? <div onClick={() => changeCurrentStep('ResultsAnalysis')} className={currentStep === "ResultsAnalysis" ? "active" : ""}>RESULTS & ANALYSIS </div> : null}
                {currentCourse?.troubleshoot ? <div onClick={() => changeCurrentStep('Troubleshoot')} className={currentStep === "Troubleshoot" ? "active" : ""}>TROUBLESHOOT </div> : null}
                {currentCourse?.excercise ? <div onClick={() => changeCurrentStep('Excercise')} className={currentStep === "Excercise" ? "active" : ""}>EXCERCISE </div> : null}
              </div>

                {/* <ProgressBar currentNav={currentStep} buildCircuitSteps={currentCourse} /> */}
              </>)
          }

          <div className="body">
            {currentCourse && currentStep === 'BuildCircuit' ? <div className="short-padder">  <BuildCircuit id={currentCourse.buildCircuit} type={this.props.match.params.type} /> </div> : null}
            {currentCourse && currentStep === 'Introduction' ? <div className="body-padder"> <Introduction id={currentCourse.introduction} /> </div> : null}
            {/* temporary placeholder [TODO] */}
            {currentCourse && currentStep === 'ResultsAnalysis' ? <div className="body-padder"><ResultsAnalysis id={currentCourse.results} /> </div> : null}
            {/* placeholder end [TODO] */}
            {currentCourse && currentStep === 'Experiment' ? <div className="body-padder"><Experiment id={currentCourse.experiment} type={this.props.match.params.type} overlayUnread={this.state.overlayUnread} setOverlayUnread={this.setOverlayUnread} isGettingStarted={this.state.isGettingStarted} /></div> : null}
            {currentCourse && currentStep === 'Troubleshoot' ? <div className="body-padder"><Troubleshoot id={currentCourse.troubleshoot} />  </div> : null}
            {currentCourse && currentStep === 'Excercise' ? <div className="body-padder"><Excercise id={currentCourse.excercise} /> </div> : null}
          </div>

          {/* <div className="footer">
            <p>Copyright</p>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 10H11.25V5H13.75V10ZM13.75 12.5H11.25V15H13.75V12.5ZM25 2.5V17.5C25 18.163 24.7366 18.7989 24.2678 19.2678C23.7989 19.7366 23.163 20 22.5 20H5L0 25V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H22.5C23.163 0 23.7989 0.263392 24.2678 0.732233C24.7366 1.20107 25 1.83696 25 2.5ZM22.5 2.5H2.5V19L4 17.5H22.5V2.5Z"
                fill="#002E48"
              />
            </svg>
          </div> */}
        </div>
    );



  }

};

const mapStateToProps = state => ({
  currentStep: state.courseReducer.currentStep,
  currentCourse: state.courseReducer.currentCourse
})

const mapDispatchToProps = dispatch => ({
  changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch),
  getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
  removeCurrentCourse: bindActionCreators(removeCurrentCourse, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)
