import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentModule } from '../action';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SUBMODULE } from '../../../config';
import './styles.scss';

class Module extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentModule(this.props.match.params.id);
    }
    render() {
        const { module } = this.props;
        if (module)
            return (
                <div className="module-container">
                    <div className="module-navbar">
                        <div className="module-name">
                            {module.name.toUpperCase()}
                        </div>
                        <span style={{ fontSize: '200%' }}>|</span>
                        <div className="submodule-name">
                            {SUBMODULE.toUpperCase()}S
                        </div>
                    </div>
                    <ol className="submodule-list">
                        {module.courses &&
                            module.courses.map((course) => (
                                <Link
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
