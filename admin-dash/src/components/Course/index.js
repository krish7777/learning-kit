import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentCourse,getParentModule } from './action';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SUBMODULE,GETTINGSTARTED } from '../../config';

class Course extends Component {
    componentDidMount() {
        // console.log(this.props.match.params.id);
        this.props.getCurrentCourse(this.props.match.params.id)
        this.props.getParentModule(this.props.match.params.id)
    }
    render() {
        const { course,parent } = this.props;
        return (
            <div>
            {SUBMODULE.toUpperCase()} {this.props.match.params.id}
            <br/>
            {parent!==GETTINGSTARTED&&
                <div>
                    <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/introduction/${this.props.match.params.id}`}>INTRODUCTION</Link>
                    </Button>
                    <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/build-circuit/${this.props.match.params.id}`}>BUILD CIRCUIT</Link>
                    </Button>
                    <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/experiment/${this.props.match.params.id}`}>EXPERIMENT</Link>
                    </Button>
                    {course.experiment && this.props.match.params.type === "digital" ? <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/experiment-form/${this.props.match.params.id}/${course.experiment}`}>EXPERIMENT FORM</Link>
                    </Button> : null}
                    <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/troubleshoot/${this.props.match.params.id}`}>TROUBLESHOOT</Link>
                    </Button>
                    <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/results/${this.props.match.params.id}`}>RESULTS AND ANALYSIS</Link>
                    </Button>
                    <Button>
                        <Link to={`/i/${this.props.match.params.type}/course/excercise/${this.props.match.params.id}`}>EXCERCISE</Link>
                    </Button>
                </div>
            }
            {parent===GETTINGSTARTED&&
            <>
                <Button>
                    <Link to={`/i/${this.props.match.params.type}/course/experiment/${this.props.match.params.id}/${course.experiment}`}>ADD INFOGRAPHICS</Link>
                </Button>
            </>
            }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    course: state.courseReducer.currentCourse,
    parent: state.courseReducer.currentParent
})

const mapDispatchToProps = dispatch => ({
    getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
    getParentModule: bindActionCreators(getParentModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)