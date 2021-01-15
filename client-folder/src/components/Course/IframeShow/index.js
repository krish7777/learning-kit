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
const IframeShow = (
  { steps, changeStep, simulation, changeCurrentStep, overlayUnread, setOverlayUnread, isGettingStarted, finalMessage, experimentForm }
) => {


  const [iFrame, setIframe] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [overlayIsOpen, setOverlayIsOpen] = useState(overlayUnread);
  const [finalOverlayIsOpen, setFinalOverlayIsOpen] = useState(false);
  const [experimentFormOpen, setExperimentFormOpen] = useState(false)

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
          setFinalOverlayIsOpen(true);
          if (experimentForm)
            setExperimentFormOpen(true);
          // TODO: EXPERIMENT FORM OPEN ON THE RIGHT
        }
      }
    }

  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }

  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="iframeShow">
      <div className="iframeShow-slideshow" style={experimentFormOpen ? { width: "70%", transform: "translateX(-10%)" } : { width: "100%" }}>
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
      {experimentFormOpen &&
        <div className="result-analysis-container experiment-form">
          <div className="form-builder">
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
})

const mapDispatchToProps = dispatch => ({
  changeStep: bindActionCreators(changeStep, dispatch),
  changeCurrentStep: bindActionCreators(changeCurrentStep, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IframeShow);
