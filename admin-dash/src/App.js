import React from 'react';
import "./App.scss"
import TextEditor from './components/TextEditor';
import LivePreview from './components/TextEditor/LivePreview';
import FormBuilder from './components/FormBuilder';
import 'antd/dist/antd.css';
import BuildCircuitBuilder from './components/BuildCircuitBuilder';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      content: ''
    }
  }
  handleEditorChange = (content, editor) => {
    this.setState({ content })
    // window.localStorage.setItem({ content: e.target.getContent() })
  }

  render() {
    return (
      <div className="app">
        {/* <TextEditor /> */}
        {/* <LivePreview /> */}
        {/* <FormBuilder /> */}
        {/* <BuildCircuitBuilder /> */}
        <iframe allowtransparency="true" style={{ background: "red" }} width="600px" height="400px" src="https://circuitverse.org/simulator/embed/247" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>      </div>

    );
  }
}

export default App;


