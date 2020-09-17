import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentCourse } from './action';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Course extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentCourse(this.props.match.params.id)

    }
    render() {
        const { course } = this.props;
        return (
            <div>
                COURSE {this.props.match.params.id}
                <div>
                    <Button>
                        <Link to={`/course/introduction/${this.props.match.params.id}`}>INTRODUCTION</Link>
                    </Button>
                    <Button>
                        <Link to={`/course/build-circuit/${this.props.match.params.id}`}>BUILD CIRCUIT</Link>
                    </Button>
                    <Button>
                        <Link to={`/course/experiment/${this.props.match.params.id}`}>EXPERIMENT</Link>
                    </Button>
                    <Button>
                        <Link to={`/course/troubleshoot/${this.props.match.params.id}`}>TROUBLESHOOT</Link>
                    </Button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    course: state.courseReducer.currentCourse
})

const mapDispatchToProps = dispatch => ({
    getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)