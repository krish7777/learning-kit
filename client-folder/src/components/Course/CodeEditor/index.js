import React, { useState, useEffect } from "react";
import "./styles.scss";

import IdeHeader from "../../../assets/images/IDE Header.png"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import { connect } from "react-redux";

const CodeEditor = (props) => {

  return (
    <div className="code-editor" style={props.showCode ? { width: "35%" } : { width: "0%" }}>
      <div style={{
        backgroundImage: `url(${IdeHeader})`,
        minWidth: "100%",
        height: "15%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "100% 100%"
      }}>
      </div>
      <div style={{ flex: 1, backgroundColor: "blue" }}>
        <AceEditor
          width="100%"
          height="100%"

          placeholder="Placeholder Text"
          mode="java"
          theme="tomorrow"
          name="blah2"
          fontSize={18}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          value={props.code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  showCode: state.courseReducer.showCode
})

export default connect(mapStateToProps)(CodeEditor)
