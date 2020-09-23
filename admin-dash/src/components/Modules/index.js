import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getModules } from './action'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import { Button } from 'antd'

class Modules extends Component {

    componentDidMount = async () => {
        await this.props.getModules(this.props.match.params.type)
        console.log("after fetch")
    }

    render() {
        const { modules } = this.props;
        return (
            <div>
                <div>All {this.props.match.params.type} modules</div>
                {modules.map(module => (
                    <Link to={`/${this.props.match.params.type}/module/${module._id}`}>
                        <div>{module.name}</div>
                    </Link>
                ))}
                <br/>
                <Link to={`/${this.props.match.params.type}/add-module`}><Button>Add Module</Button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    modules: state.modulesReducer.modules
})

const mapDispatchToProps = dispatch => ({
    getModules: bindActionCreators(getModules, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Modules)
