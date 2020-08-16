import React from 'react';
import "./App.scss"
import TextEditor2 from './components/TextEditor2';
import LivePreview from './components/TextEditor2/LivePreview';
import FormBuilder from './components/FormBuilder';
import 'antd/dist/antd.css';
import BuildCircuitBuilder from './components/BuildCircuitBuilder';
import Modules from './components/Modules';
import { Route } from 'react-router-dom';
import AddModule from './components/Modules/AddModule';

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
        <TextEditor2 />
        <LivePreview />
        <FormBuilder />
        <BuildCircuitBuilder />

        {/* <iframe width="600px" height="400px" src="https://editor.p5js.org/SoumitroV/embed/Hwq52Cn0t"></iframe>
        <iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/248" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe> */}
        {/* <Modules /> */}
        {/* <Route path="/modules" component={Modules} />
        <Route path="/add-module" component={AddModule} /> */}

      </div>
    );
  }
}

export default App;


