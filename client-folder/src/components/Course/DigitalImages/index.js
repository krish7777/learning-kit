import React, { useState, useEffect } from "react";
import "./styles.scss";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import { connect } from "react-redux";

const DigitalImages = (props) => {

    return (
        <div className="code-editor" style={props.showSide ? { width: "35%" } : { width: "0%" }}>

            <div style={{ flex: 1, backgroundColor: "white" }}>
                {props.stepNo}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    showSide: state.courseReducer.showSide,
    stepNo: state.courseReducer.stepNo
})


export default connect(mapStateToProps)(DigitalImages)
