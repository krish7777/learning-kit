import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentCourse, getParentModule, clearAdminSubmodule, deleteType } from './action';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SUBMODULE, GETTINGSTARTED } from '../../config';
import './styles.scss';

class Course extends Component {
    componentDidMount() {
        // console.log(this.props.match.params.id);
        this.props.getCurrentCourse(this.props.match.params.id);
        this.props.getParentModule(this.props.match.params.id);
    }
    onDel = async (id, field) => {
        await this.props.deleteType(id, field);
        this.props.history.go(0);
    };
    // componentWillUnmount() {
    //     this.props.clearAdminSubmodule();
    // }
    render() {
        const { course, parent } = this.props;
        return (
            <div className="submod-divs-container">
                <h2>
                    {' '}
                    {SUBMODULE.toUpperCase()} : {course.name}
                </h2>

                <br />
                {parent !== GETTINGSTARTED && (
                    <div className="divslist">
                        <div style={{ "display": "flex" }}>

                            <Button className="button-divs">
                                <Link
                                    to={`/admin/${this.props.match.params.type}/course/introduction/${this.props.match.params.id}`}
                                >
                                    INTRODUCTION
                                </Link>
                            </Button>
                            <Button danger className="button-divs delete-divs">
                                <Link
                                    onClick={() => { this.onDel(this.props.match.params.id, "introduction") }}
                                >
                                    DELETE
                                </Link>
                            </Button>

                        </div>
                        <div style={{ "display": "flex" }}>

                            <Button className="button-divs">
                                <Link
                                    to={`/admin/${this.props.match.params.type}/course/build-circuit/${this.props.match.params.id}`}
                                >
                                    BUILD CIRCUIT
                                </Link>
                            </Button>
                            <Button danger className="button-divs delete-divs">

                                <Link
                                    onClick={() => { this.onDel(this.props.match.params.id, "buildCircuit") }}
                                >
                                    DELETE
                                </Link>
                            </Button>
                        </div>
                        {
                            this.props.match.params.type === 'digital' ? (
                                <div style={{ "display": "flex" }}>

                                    <Button className="button-divs">
                                        <Link
                                            to={`/admin/${this.props.match.params.type}/course/simulation/${this.props.match.params.id}`}
                                        >
                                            SIMULATION
                                        </Link>
                                    </Button>
                                    <Button danger className="button-divs delete-divs">
                                        <Link
                                            onClick={() => { this.onDel(this.props.match.params.id, "simulation") }}
                                        >
                                            DELETE
                                        </Link>
                                    </Button>

                                </div>
                            ) : null
                        }

                        {
                            this.props.match.params.type === 'arduino' ? (
                                <div style={{ "display": "flex" }}>
                                    <Button className="button-divs">
                                        <Link
                                            to={`/admin/${this.props.match.params.type}/course/videoembed/${this.props.match.params.id}`}
                                        >
                                            VIDEO
                                        </Link>
                                    </Button>
                                    <Button danger className="button-divs delete-divs">
                                        <Link
                                            onClick={() => { this.onDel(this.props.match.params.id, "videoembed") }}
                                        >
                                            DELETE
                                        </Link>
                                    </Button>

                                </div>
                            ) : null
                        }
                        <div style={{ "display": "flex" }}>
                            <Button className="button-divs">
                                <Link
                                    to={`/admin/${this.props.match.params.type}/course/experiment/${this.props.match.params.id}`}
                                >
                                    EXPERIMENT
                                </Link>
                            </Button>
                            <Button danger className="button-divs delete-divs">

                                <Link
                                    onClick={() => { this.onDel(this.props.match.params.id, "experiment") }}
                                >
                                    DELETE
                                </Link>
                            </Button>

                        </div>
                        {course.experiment &&
                            this.props.match.params.type === 'digital' ? (
                            <>
                                <Button className="button-divs">
                                    <Link
                                        to={`/admin/${this.props.match.params.type}/course/experiment-form/${this.props.match.params.id}/${course.experiment}`}
                                    >
                                        EXPERIMENT FORM
                                    </Link>
                                </Button>
                            </>
                        ) : null}
                        <div style={{ "display": "flex" }}>
                            <Button className="button-divs">
                                <Link
                                    to={`/admin/${this.props.match.params.type}/course/troubleshoot/${this.props.match.params.id}`}
                                >
                                    TROUBLESHOOT
                                </Link>
                            </Button>
                            <Button danger className="button-divs delete-divs">

                                <Link
                                    onClick={() => { this.onDel(this.props.match.params.id, "troubleshoot") }}
                                >
                                    DELETE
                                </Link>
                            </Button>

                        </div>
                        <div style={{ "display": "flex" }}>

                            <Button className="button-divs">
                                <Link
                                    to={`/admin/${this.props.match.params.type}/course/results/${this.props.match.params.id}`}
                                >
                                    RESULTS AND ANALYSIS
                                </Link>
                            </Button>
                            <Button danger className="button-divs delete-divs">

                                <Link
                                    onClick={() => { this.onDel(this.props.match.params.id, "results") }}
                                >
                                    DELETE
                                </Link>
                            </Button>
                        </div>
                        <div style={{ "display": "flex" }}>

                            <Button className="button-divs">
                                <Link
                                    to={`/admin/${this.props.match.params.type}/course/excercise/${this.props.match.params.id}`}
                                >
                                    EXCERCISE
                                </Link>
                            </Button>
                            <Button danger className="button-divs delete-divs">
                                <Link
                                    onClick={() => { this.onDel(this.props.match.params.id, "excercise") }}
                                >
                                    DELETE
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
                {parent === GETTINGSTARTED && (
                    <>
                        <Button>
                            <Link
                                to={{
                                    pathname: `/admin/${this.props.match.params.type}/course/experiment/${this.props.match.params.id}`,
                                    state: { gettingStarted: true },
                                }}
                            >
                                ADD INFOGRAPHICS
                            </Link>
                        </Button>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    course: state.courseReducer.currentCourse,
    parent: state.courseReducer.currentParent,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
    getParentModule: bindActionCreators(getParentModule, dispatch),
    clearAdminSubmodule: bindActionCreators(clearAdminSubmodule, dispatch),
    deleteType: bindActionCreators(deleteType, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
