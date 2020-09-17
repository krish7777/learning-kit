import React, { useState, useEffect } from "react";
import "./styles.scss";

import IdeHeader from "../../../assets/images/IDE Header.png"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import { connect } from "react-redux";

const DigitalImages = (props) => {
  const [code, setcode] = useState("");


  useEffect(() => {
    fetch(`/code/code${2}.txt`)
      .then((r) => r.text())
      .then((text) => {
        setcode(text);
      });
  });

  return (
    <div className="code-editor" style={props.showImages ? { width: "30%" } : { width: "0%" }}>

      <div style={{ flex: 1, backgroundColor: "black" }}>

      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  showImages: state.digitalExperimentReducer.showImages
})

export default connect(mapStateToProps)(DigitalImages)
