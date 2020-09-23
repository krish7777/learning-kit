import React from "react";
import Home from "./components/Home";
import "antd/dist/antd.css";
import Modules from "./components/Modules";
import Course from "./components/Course";
import { Route } from "react-router-dom";
import DigitalExperiment from "./components/DigitalExperiment";

const App = () => {
  return (
    <div>

      <Route path="/:type/course/:id" component={Course} />
      <Route path="/digital-experiment" component={DigitalExperiment} />
      <Route exact path="/:type" component={Home} />
      <Route path="/:type/modules" component={Modules}/>
    </div>
  );
};

export default App;
