import React from "react";
import "antd/dist/antd.css";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import FAQs from "./components/Home/FAQs";
import Modules from "./components/Modules";
import Course from "./components/Course";
import MainHome from "./components/MainHome";

const App = () => {
  return (
    <div>
      <Route path="/:type/course/:id" component={Course} />
      <Route exact path="/:type" component={Home} />
      <Route exact path="/:type/course-troubleshoot" component={FAQs} />
      <Route path="/:type/modules" component={Modules} />
      <Route exact path="/" component={MainHome} />
    </div>
  );
};

export default App;
