import React from 'react';
import "./App.scss"
import TextEditor2 from './components/TextEditor2';
import LivePreview from './components/TextEditor2/LivePreview';
import FormBuilder from './components/FormBuilder';
import 'antd/dist/antd.css';
import BuildCircuitBuilder from './components/BuildCircuitBuilder';
import Modules from './components/Modules';
import { Route, Switch } from 'react-router-dom';
import AddModule from './components/Modules/AddModule';
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
        <Switch>
          <Route path="/:type/module/:id" component={Module} />
          <Route path="/:type/course/introduction/:id" component={AddIntroduction} />
          <Route path="/:type/course/experiment/:id" component={AddExperiment} />
          <Route path="/:type/course/troubleshoot/:id" component={AddTroubleshoot} />
          <Route path="/:type/course/build-circuit/:id" component={AddBuildCircuit} />
          <Route path="/:type/course/experiment-form/:id/:expId" component={AddExperimentForm}/>
          <Route path="/:type/course/results/:id" component={AddResults}/>
          <Route path="/:type/course/excercise/:id" component={AddExcercise}/>
          <Route exact path="/:type" component={Modules} />

          <Route exact path="/:type/course/:id" component={Course} />
          <Route path="/:type/add-module" component={AddModule} />
          <Route path="/:type/add-course/:module_id" component={AddCourse} />
          <Route path="/" component={CreatorHome} />
        </Switch>



        {/* <TextEditor /> */}

      </div>
    );
  }
}

export default App;


