import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getModules } from './action'
import { bindActionCreators } from 'redux'
import { Link } from "react-router-dom"
import { Button } from 'antd'

class Modules extends Component {

    componentDidMount = async () => {
        await this.props.getModules()
        console.log("after fetch")
    }

    render() {
        const { modules } = this.props;
        return (
            <div>

                {modules.map(module => (
                    <Link to={`/module/${module._id}`}>
                        <div>{module.name}</div>
                    </Link>
                ))}
                <Link to="/add-module"><Button>Add Module</Button></Link>
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
