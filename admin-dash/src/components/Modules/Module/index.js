import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentModule } from '../action';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SUBMODULE } from '../../../config';

class Module extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getCurrentModule(this.props.match.params.id)
    }
    render() {
        const { module } = this.props;
        if (module)
            return (
                <div>
                    <div>{module.name}</div>
                    <div>{SUBMODULE.toUpperCase()}S</div>
                    <div>
                        {module.courses && module.courses.map(course =>
                            <Link to={`/i/${this.props.match.params.type}/course/${course._id}`}>
                                <div>{course.name}</div>
                            </Link>
                        )}
                    </div>
                    <Link to={`/i/${this.props.match.params.type}/add-course/${module._id}`}><Button>Add {SUBMODULE}</Button></Link>
                </div>
            )
        else
            return null;
    }
}

const mapStateToProps = state => ({
    module: state.modulesReducer.currentModule
})

const mapDispatchToProps = dispatch => ({
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Module);