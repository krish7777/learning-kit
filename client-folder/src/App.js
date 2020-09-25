import React from "react";
import Home from "./components/Home";
import "antd/dist/antd.css";
import Modules from "./components/Modules";
import Course from "./components/Course";
import { Route } from "react-router-dom";
import MainHome from "./components/MainHome";

const App = () => {
  return (
    <div>

      <Route path="/:type/course/:id" component={Course} />
      <Route exact path="/:type" component={Home} />
      <Route path="/:type/modules" component={Modules} />
      <Route exact path="/" component={MainHome} />
    </div>
  );
};

export default App;
