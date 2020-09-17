import React from "react";
import Home from "./components/Home";
import "antd/dist/antd.css";
import Module from "./components/Module";
import Experiment from "./components/Experiment";
import { Route } from "react-router-dom";
import DigitalExperiment from "./components/DigitalExperiment";

const App = () => {
  return (
    <div>
      {/* <Home /> */}
      {/* <Module moduleNo={1} moduleName={"Lets get started..."} />
      <Module moduleNo={2} moduleName={"Lets get rollin..."} /> */}
      {/* <Experiment /> */}
      <Route exact path="/" component={Home} />
      <Route path="/experiment" component={Experiment} />
      <Route path="/digital-experiment" component={DigitalExperiment} />
      <Route path="/modules" render={() => <><Module moduleNo={1} moduleName={"Lets get started..."} />
        <Module moduleNo={2} moduleName={"Lets get rollin..."} /></>} />
    </div>
  );
};

export default App;
