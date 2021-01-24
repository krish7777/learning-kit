import React from "react";
import "./styles.scss";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllModules, getSomeData } from "./action";
import { Button, Popover, Collapse, Input } from "antd";
import Background from "../../assets/images/background.png"
import ReactHtmlParser from 'react-html-parser';

import { Link } from "react-router-dom";
const { Panel } = Collapse;


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    }
  }

  componentDidMount() {
    this.props.getAllModules(this.props.match.params.type)
  }

  onSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }
  render() {
    // const { allCourses } = this.props;
    // const { searchValue } = this.state;
    // const filteredCourses = allCourses.filter(module => module.module.toLowerCase().includes(searchValue.toLowerCase()) || module.courses.filter(course => course.name.toLowerCase().includes(searchValue.toLowerCase())).length)
    const { allModules } = this.props;
    const { searchValue } = this.state;
    const filteredModules = allModules.filter(module => module.name.toLowerCase().includes(searchValue.toLowerCase()) || module.courses.filter(course => course.name.toLowerCase().includes(searchValue.toLowerCase())).length)
    console.log(filteredModules)
    return (
      <div className="home-main-container">
        <Navbar type={this.props.match.params.type} />
        <div className="home">
          <div className="main-page-intro">
            <h1>Hands On {this.props.match.params.type === 'arduino' ? ('Arduino') : ('Digital')} Basics Course</h1>
            <h3>By Prof. T S Natarajan | NPTEL Course</h3>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim velit mollit. Exercitation
              veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
              ullamco est sit aliqua dolor do amet sint. ullamco est sit aliqua
              dolor do amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
            <p>
              Velit officia consequat duis enim velit mollit. Exercitation veniam
              consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco
              veniam consequat sunt nostrud amet. est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim velit mollit. Exercitation
              veniam consequat sunt nostrud amet.{" "}
            </p>

            {/* ALL LINKS */}
            <p>
              Link to Study Material -{" "}
              <a href="https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/">
                {" "}
                https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/
              </a>
            </p>
            <p>
              Link to Study Material -{" "}
              <a href="https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/">
                {" "}
                https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/
              </a>
            </p>
            <p>
              Link to Study Material -{" "}
              <a href="https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/">
                {" "}
                https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/
              </a>
            </p>
            {
              allModules.length && allModules[0].courses && allModules[0].courses.length && allModules[0].courses[0]._id &&
              <div className="home-getStarted-button-container">
                <Link to={`/${this.props.match.params.type}/course/${allModules[0].courses[0]._id}`}>
                  <Button size={"large"} className="home-getStarted-button" >Let's Get Started</Button>
                </Link>
              </div>
            }


          </div>

          <div className="course-curriculum">
            <h3>Course Curriculum{" "}
              <span>({filteredModules.length} modules)</span></h3>
            <div className="course-summary">
              <Input placeholder="Search any module/course" value={this.state.searchValue} onChange={this.onSearchChange} style={{ background: "transparent", color: "white", border: "1px solid #324454", fontSize: "18px", marginBottom: "10px" }} />

              {filteredModules.map((module, index) => {
                return (


                  <Collapse ghost accordion expandIconPosition={"right"} >

                    <Panel key={module._id} style={{ border: "1px solid #324454" }} header={index + 1 + ". " + module.name} key={module.index}>
                      {module.courses.map(course => <Link to={`/${this.props.match.params.type}/course/${course._id}`}><div key={course._id} className="sub-course">{course.name}</div></Link>)}
                    </Panel>
                  </Collapse>


                )
              })}

            </div>

          </div>
        </div>


      </div>

    );
  }

}

const mapStateToProps = (state) => ({
  someData: state.homeReducer.someData,
  allCourses: state.homeReducer.allCourses,
  allModules: state.homeReducer.allModules
});

const mapDispatchToProps = (dispatch) => ({
  getSomeData: bindActionCreators(getSomeData, dispatch),
  getAllModules: bindActionCreators(getAllModules, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
