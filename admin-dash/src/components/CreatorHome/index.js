import React from "react"
import { Link } from "react-router-dom"


class CreatorHome extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                CREATOR HOME
                <br/>
                <Link to="/arduino">
                ARDUINO
                </Link>
                <br/>
                <Link to="/digital">
                DIGITAL
                </Link>
            </div>
        )
    }
}

export default CreatorHome