import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentModule } from '../action';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SUBMODULE } from '../../../config';
import './styles.scss';

class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWindow: 'module-details',
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentModule(this.props.match.params.id);
    }

    changeCurrentWindow = (selectedOptionWord) => {
        // console.log(
        //     'NOW SHOWING:' + this.state.selectedWindow
        // );
        this.setState({
            ...this.state,
            selectedWindow: selectedOptionWord,
        });
    };
    render() {
        const { module } = this.props;
        if (module)
            return (
                <div className="module-container">
                    <div className="module-navbar">
                        <div className="module-name">
                            {module.name.toUpperCase()}
                        </div>
                        <div className="navbar-horizontal">
                            <button
                                className="module-details"
                                onClick={() =>
                                    this.changeCurrentWindow('module-details')
                                }
                            >
                                MODULE DETAILS
                            </button>

                            <button
                                className="submodule-name"
                                onClick={() =>
                                    this.changeCurrentWindow('submodule-name')
                                }
                            >
                                {SUBMODULE.toUpperCase()}S
                            </button>
                        </div>
                    </div>

                    {/* SHOW MODULE DETAILS / SUBMODULES*/}
                    {this.state.selectedWindow === 'module-details' ? (
                        <form>
                            <h2 style={{ right: '4%', position: 'absolute' }}>
                                Hello !
                            </h2>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={module.name}
                                onChange={this.myChangeHandler}
                            />
                            <br />
                            <label> Introduction:</label>
                            <input
                                type="text"
                                name="introduction"
                                placeholder={module.introduction}
                                onChange={this.myChangeHandler}
                            />
                            <br />
                            <Link
                                to={`/i/${this.props.match.params.type}/module/${module._id}`}
                            >
                                <Button className="add-button">UPDATE</Button>
                            </Link>
                        </form>
                    ) : (
                        <div>
                            <ol className="submodule-list">
                                {module.courses &&
                                    module.courses.map((course) => (
                                        <Link
                                            key={Math.random()}
                                            to={`/i/${this.props.match.params.type}/course/${course._id}`}
                                        >
                                            <li className="submodule-listItem">
                                                {course.name}
                                            </li>
                                        </Link>
                                    ))}
                            </ol>

                            <Link
                                to={`/i/${this.props.match.params.type}/add-course/${module._id}`}
                            >
                                <Button className="add-button">
                                    + Add {SUBMODULE}
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            );
        else return null;
    }
}

const mapStateToProps = (state) => ({
    module: state.modulesReducer.currentModule,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Module);
