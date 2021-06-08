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
import { ReactComponent as HideIcon } from "../../../assets/images/HideIcon.svg"
import { bindActionCreators } from "redux";
import { changeCurrentStep, changeStep } from "../action";
import TextEditor from '../../TextEditor'
import DigitalImages from '../DigitalImages'

import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  InputNumber,
  notification,
  Switch,
  Upload
} from 'antd'
import { UploadOutlined } from '@ant-design/icons';


const SlideShow = (
  { steps, changeCurrentStep, isGettingStarted, experimentCurrStep, setExperimentStep, experimentForm, currentCourse, changeStep, sideImages }
) => {


  const [images, setImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const inputEl = useRef(null);
  const [finalOverlayIsOpen, setFinalOverlayIsOpen] = useState(false);
  const [experimentFormOpen, setExperimentFormOpen] = useState(false);
  const [showSideImages, setShowSideImages] = useState(sideImages);


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
    inputEl.current.slideToIndex(experimentCurrStep)
  }, [steps]);

  const skipToCode = (index) => {
    inputEl.current.slideToIndex(index);
  };


  const goLeft = () => {
    if (finalOverlayIsOpen) {
      setFinalOverlayIsOpen(false);
    } else {
      inputEl.current.slideToIndex(currentStep - 1 === -1 ? 0 : currentStep - 1);
    }
  };

  const goRight = () => {

    inputEl.current.slideToIndex(
      currentStep + 1 === steps.length ? currentStep : currentStep + 1
    );
    if (currentStep + 1 === steps.length && !isGettingStarted) {
      if (finalOverlayIsOpen) {
        currentCourse.simulation ?
          changeCurrentStep('Simulation') : changeCurrentStep('ResultsAnalysis')
      }
      else {
        setFinalOverlayIsOpen(true);
        if (experimentForm)
          setExperimentFormOpen(true)
      }
    }


  };

  const onSlide = (slideNo) => {
    // console.log("Slide Number", slideNo)
    setExperimentStep(slideNo)
    // console.log("Expr current Slide", experimentCurrStep)
    // console.log("current Step", currentStep)
    setCurrentStep(slideNo)
    changeStep(slideNo)

  }

  const modalChecker = (x) => {
    onSlide(x)
  };

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="expshow">

      <div className="expshow-slideshow" style={experimentFormOpen || showSideImages ? {
        width: "65%",

        // transform: "translateX(-10%)"

      } : { width: "80%", margin: "auto" }}>
        <div style={{ background: "white" }} className={finalOverlayIsOpen ? "overlayed gallerycontainer" : "gallerycontainer"}>
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
          {
            // overlayIsOpen &&
            //   <div className="overlay-content">
            //     <span>You have successfuly completed the code required to do this experiment. Now upload the code to the Arduino Uno board and lets get started with the experiment.</span>
            //     {/* <Link to="/" onClick={(event) => event.preventDefault()}> */}
            //     <span onClick={() => changeCurrentStep('Introduction')} style={{ color: "#0C6A9F", fontSize: "medium", cursor: "pointer" }}> HINT: How to upload IDE code to Arduino board</span>
            //     {/* </Link> */}
            //   </div>
          }

          {finalOverlayIsOpen &&
            <div className="overlay-content">
              <span>End of experiment</span>
            </div>
          }

        </div>

        <div className={finalOverlayIsOpen ? "overlayed code-step" : "code-step"} style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
          Step {currentStep + 1} : {steps[currentStep].description}
        </div>

        <div className="nav">
          <div onClick={goLeft} className="left-arrow">
            <LeftArrow />
          </div>
          <div className="divider"></div>
          {
            // overlayIsOpen &&
            //   <>
            //     <div onClick={closeOverlay} className="codeUp-btn">
            //       <SkipIcon />
            //     CODE UPLOAD SUCCESSFUL
            //     </div>
            //     <div className="divider"></div> {/* Divider Here */}
            //   </>
          }
          {!isGettingStarted &&
            <div onClick={() => { changeCurrentStep('Troubleshoot') }} className="troubleshoot-btn">
              <TroubleshootIcon />
          TROUBLESHOOT
        </div>
          }
          {!isGettingStarted && sideImages && <> <div className="divider"></div><div onClick={() => {
            if (experimentFormOpen) {
              setExperimentFormOpen(false)
              setShowSideImages(true);
            }
            else
              setShowSideImages(!showSideImages);
          }} className="troubleshoot-btn">
            <HideIcon />
            SHOW/HIDE PIN DIAGRAMS
          </div></>}
          {isGettingStarted &&
            // <div style={{
            //   width: "100%"
            // }}></div>
            <div className="troubleshoot-btn">
              CONTACT TEACHER
        </div>
          }
          <div className="divider"></div> {/* Divider Here */}
          <div onClick={goRight} className="right-arrow">
            <RightArrow />
          </div>
        </div>
      </div>

      {showSideImages && !experimentFormOpen &&

        <DigitalImages steps={steps} />
      }

      {experimentFormOpen &&
        <div className="result-analysis-container experiment-form">
          <div className="form-builder" style={{ height: "100%" }}>
            <div className="preview-form">
              <Form layout="vertical" onFinish={(values) => { console.log(values) }}>

                {
                  experimentForm?.formContent?.map(field => {
                    const { type, name, label, required } = field;

                    switch (type) {
                      case 'input': return (
                        <Form.Item label={label} name={name} rules={[
                          { required: required }
                        ]}>
                          <Input />
                        </Form.Item>
                      )
                        break;
                      case 'textarea': return (
                        <Form.Item label={label} name={name} rules={[
                          { required: required }
                        ]}>
                          <Input.TextArea autoSize={{ minRows: 3, maxRows: 100 }} />
                        </Form.Item>
                      )
                        break;
                      case 'texteditor': return (
                        <Form.Item label={label} name={name} rules={[
                          { required: required }
                        ]}>
                          <TextEditor />
                        </Form.Item>
                      )
                        break;
                      case 'number': return (
                        <Form.Item label={label} name={name} rules={[
                          { required: required }
                        ]}>
                          <InputNumber />
                        </Form.Item>
                      )
                      case 'checkbox': return (
                        <Form.Item name={name} valuePropName="checked" label={label} initialValue={false}>
                          <Checkbox></Checkbox>
                        </Form.Item>
                      )
                        break;
                      case 'radio': return (
                        <Form.Item label={label} name={name} rules={[
                          { required: required }
                        ]}>
                          <Radio.Group>
                            {field.values.map(rad =>
                              <Radio value={rad}>{rad}</Radio>)}
                          </Radio.Group>

                        </Form.Item>
                      )
                        break;
                      case 'switch': return (
                        <Form.Item name="switch" label="Switch" valuePropName="checked">
                          <Switch checkedChildren="1" unCheckedChildren="0" />
                        </Form.Item>
                      )
                        break;
                      case 'text': {
                        console.log(label)
                        return (
                          <Form.Item >
                            <div style={{ whiteSpace: "pre-wrap", color: "white" }}>{name}</div>
                          </Form.Item>
                        )
                      }
                        break;
                      case 'heading': {
                        return (
                          <Form.Item >
                            {label === 'h1' ? <h1>{name}</h1> : label === 'h2' ? <h2>{name}</h2> : label === 'h3' ? <h3>{name}</h3> : label === 'h4' ? <h4>{name}</h4> : label === 'h5' ? <h5>{name}</h5> : <h6>{name}</h6>}
                            {/* <div style={{ whiteSpace: "pre-wrap" }}>{name}</div> */}
                          </Form.Item>
                        )
                      }
                        break;
                      case 'checkboxgroup': {
                        return (
                          <Form.Item label={label} name={name} rules={[
                            { required: required }
                          ]}>
                            <Checkbox.Group>
                              {field.values.map(check =>
                                <Checkbox value={check}>{check}</Checkbox>)}
                            </Checkbox.Group>
                          </Form.Item>
                        )
                      }
                        break;
                      case 'row': {
                        return (
                          <div className="truth-table-row">
                            {field.values.map(value => {
                              if (value.startsWith('_switch_')) {
                                return (
                                  <Form.Item className="switch" name={value} valuePropName="checked" initialValue={false}>
                                    <Switch checkedChildren="1" unCheckedChildren="0" />
                                  </Form.Item>
                                )
                                {/* <Form.Item>
                                                                <InputNumber defaultValue={value} disabled style={{ color: "black", textAlign: "center" }} />
                                                            </Form.Item> */}
                              }
                              else {
                                return (
                                  <Form.Item >
                                    <InputNumber defaultValue={value} disabled style={{ color: "black", textAlign: "center" }} />
                                  </Form.Item>
                                )
                              }
                            })}
                          </div>
                        )
                      }
                        break;
                      case 'upload': {
                        return (
                          <Form.Item name={name} label={label} valuePropName="fileList" getValueFromEvent={normFile} rules={[
                            { required: required }]} className="result-analysis-upload-photo-btn">
                            <Upload>
                              <Button icon={<UploadOutlined />} className="upload-photo-button">Click to upload</Button>
                            </Upload>
                          </Form.Item>
                        )
                      }
                      default: return null
                    }
                  })
                }
                <Form.Item className="result-analysis-submit-btn">
                  <Button type="primary" htmlType="submit" className="result-analysis-submit-button">
                    Submit
                                </Button>
                </Form.Item>

              </Form>
            </div>
          </div>

        </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  expSteps: state.courseReducer.currentExpSteps,
  currentCourse: state.courseReducer.currentCourse
})

const mapDispatchToProps = dispatch => ({
  changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch),
  changeStep: bindActionCreators(changeStep, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
