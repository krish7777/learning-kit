import React from 'react';
import "./App.scss"
import TextEditor2 from './components/TextEditor2';
import LivePreview from './components/TextEditor2/LivePreview';
import FormBuilder from './components/FormBuilder';
import 'antd/dist/antd.css';
import BuildCircuitBuilder from './components/BuildCircuitBuilder';
import Modules from './components/Modules';
import { Link, Route, Switch } from 'react-router-dom';
import AddModule from './components/Modules/AddModule';
import AddModuleConf from './components/Starter/AddModule';
import TextEditor from './components/TextEditor';
import Module from './components/Modules/Module';
import AddCourse from './components/Course/AddCourse';
import Course from './components/Course';
import AddIntroduction from './components/Course/AddIntroduction';
import AddExperiment from './components/Course/AddExperiment';
import AddTroubleshoot from './components/Course/AddTroubleshoot';
import AddBuildCircuit from './components/Course/AddBuildCircuit';
import AddExperimentForm from './components/Course/AddExperimentForm';
import AddExcercise from './components/Course/AddExcercise';
import CreatorHome from './components/CreatorHome';
import AddResults from './components/Course/AddResults';

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
        {/* <TextEditor2 />
        <LivePreview />
        <FormBuilder />
        <BuildCircuitBuilder /> */}

        {/* <iframe width="600px" height="400px" src="https://editor.p5js.org/SoumitroV/embed/Hwq52Cn0t"></iframe>
        <iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/248" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe> */}
        {/* <Modules /> */}
        <div><Link to="/i">HOME</Link></div>
        <Switch>
          <Route path="/i/:type/module/:id" component={Module} />
          <Route path="/i/:type/course/introduction/:id" component={AddIntroduction} />
          <Route path="/i/:type/course/experiment/:id" component={AddExperiment} />
          <Route path="/i/:type/course/troubleshoot/:id" component={AddTroubleshoot} />
          <Route path="/i/:type/course/build-circuit/:id" component={AddBuildCircuit} />
          <Route path="/i/:type/course/experiment-form/:id/:expId" component={AddExperimentForm} />
          <Route path="/i/:type/course/results/:id" component={AddResults} />
          <Route path="/i/:type/course/excercise/:id" component={AddExcercise} />
          <Route exact path="/i/:type" component={Modules} />
          <Route exact path="/i/:type/course/:id" component={Course} />
          <Route path="/i/:type/add-module" component={AddModule} />
          <Route exact path="/i/:type/add-starter" component={AddModuleConf} />
          <Route path="/i/:type/add-course/:module_id" component={AddCourse} />
          <Route path="/i" component={CreatorHome} />
        </Switch>



        {/* <TextEditor /> */}

      </div>
    );
  }
}

export default App;


