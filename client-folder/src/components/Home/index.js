import React from "react";
import "./styles.scss";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSomeData } from "./action";
import { Button, Typography, Collapse, Input } from "antd";
import Module from "../Module";
import Background from "../../assets/images/background.png"
import { Link } from "react-router-dom";
const { Panel } = Collapse;

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    }
  }

  onSearchChange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }
  render() {
    const { allCourses } = this.props;
    const { searchValue } = this.state;
    const filteredCourses = allCourses.filter(module => module.module.toLowerCase().includes(searchValue.toLowerCase()) || module.courses.filter(course => course.name.toLowerCase().includes(searchValue.toLowerCase())).length)
    // console.log(filteredCourses)
    return (
      <div style={{ backgroundColor: "#001A2F", backgroundImage: `url(${Background})` }}>
        <Navbar />
        <div className="home">
          <div className="main-page-intro">
            <h1>Hands On Arduino Basics Course</h1>
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
            <Link to="/modules">
              <Button size={"large"} style={{ backgroundColor: "#56AC00", fontSize: "20px", fontWeight: "600", marginTop: "50px", padding: "10px 50px", display: "flex", alignItems: "center" }}>Let's Get Started</Button>
            </Link>

          </div>
          <div className="course-curriculum">
            <h3>Course Curriculum
            <span>(10 modules)</span></h3>

            <div className="course-summary">
              <Input placeholder="Search any module/course" value={this.state.searchValue} onChange={this.onSearchChange} style={{ background: "transparent", color: "white", border: "1px solid #324454", fontSize: "18px" }} />
              <Collapse style={{ color: "red", marginTop: "10px" }} ghost accordion expandIconPosition={"right"} >

                {filteredCourses.map(module =>
                  <Panel style={{ border: "1px solid #324454" }} header={module.index + ". " + module.module} key={module.index}>
                    {module.courses.map(course => <div key={course.expNo} className="sub-course">{course.name}</div>)}
                  </Panel>)}

              </Collapse>
            </div>

          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = (state) => ({
  someData: state.homeReducer.someData,
  allCourses: state.homeReducer.allCourses
});

const mapDispatchToProps = (dispatch) => ({
  getSomeData: bindActionCreators(getSomeData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
