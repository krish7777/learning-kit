import React from 'react';
import "./App.scss"
import TextEditor2 from './components/TextEditor2';
import LivePreview from './components/TextEditor2/LivePreview';
import FormBuilder from './components/FormBuilder';
import 'antd/dist/antd.css';
import BuildCircuitBuilder from './components/BuildCircuitBuilder';
import Modules from './components/Modules';
import { NavLink, withRouter, Route, Switch } from 'react-router-dom';
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
import Login from "./components/Auth/Login"
import PrivateRoute from "./components/Auth/PrivateRoute"
import { Menu } from "antd";
import { HomeFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken"
import { store } from "./store"
import { setCurrentUser, logoutUser, clearErrors } from './components/Auth/action';


if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/i/login";
    // Redirect to login
  }


}



class App extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }
  constructor() {
    super()
    this.state = {
      content: '',
    }
  }
  handleEditorChange = (content, editor) => {
    this.setState({ content })
    // window.localStorage.setItem({ content: e.target.getContent() })
  }

  render() {
    const { location } = this.props;
    return (
      <div className="app">
        {/* <TextEditor2 />
        <LivePreview />
        <FormBuilder />
        <BuildCircuitBuilder /> */}

        {/* <iframe width="600px" height="400px" src="https://editor.p5js.org/SoumitroV/embed/Hwq52Cn0t"></iframe>
        <iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/248" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe> */}
        {/* <Modules /> */}
        {/* <div><Link to="/i">HOME</Link></div> */}
        <Menu theme={location.pathname == "/i" ? "dark" : "light"}
          style={{ background: location.pathname != "/i" ? "linear-gradient(to right, #FFFFFF, #ECE9E6)" : "" }}
          mode="horizontal"
          defaultSelectedKeys={['/i']}
          selectedKeys={[location.pathname]}
          onClick={e => {
            if (e.key == "logout") {
              store.dispatch(logoutUser());
            }
          }}
        >
          <Menu.Item key="/i">
            <NavLink to="/i">
              <HomeFilled />
              <span>Home</span>
            </NavLink>
          </Menu.Item>
          {localStorage.jwtToken ? <Menu.Item key="logout">
            Logout
          </Menu.Item> : null}

        </Menu>
        <Switch>
          <Route path="/i/login" component={Login} />
          <PrivateRoute path="/i/:type/module/:id" component={Module} />
          <PrivateRoute path="/i/:type/course/introduction/:id" component={AddIntroduction} />
          <PrivateRoute path="/i/:type/course/experiment/:id" component={AddExperiment} />
          <PrivateRoute path="/i/:type/course/troubleshoot/:id" component={AddTroubleshoot} />
          <PrivateRoute path="/i/:type/course/build-circuit/:id" component={AddBuildCircuit} />
          <PrivateRoute path="/i/:type/course/experiment-form/:id/:expId" component={AddExperimentForm} />
          <PrivateRoute path="/i/:type/course/results/:id" component={AddResults} />
          <PrivateRoute path="/i/:type/course/excercise/:id" component={AddExcercise} />
          <PrivateRoute exact path="/i/:type" component={Modules} />
          <PrivateRoute exact path="/i/:type/course/:id" component={Course} />
          <PrivateRoute path="/i/:type/add-module" component={AddModule} />
          <PrivateRoute exact path="/i/:type/add-starter" component={AddModuleConf} />
          <PrivateRoute path="/i/:type/add-course/:module_id" component={AddCourse} />
          <PrivateRoute path="/i" component={CreatorHome} />
        </Switch>



        {/* <TextEditor /> */}

      </div>
    );
  }
}

export default withRouter(App);


