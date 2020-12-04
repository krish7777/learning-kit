import React from "react"
import { Link } from "react-router-dom"
import { COURSE } from "../../config"


class CreatorHome extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                CREATOR HOME
                <br />
                {COURSE.toUpperCase()}S:
                <br />
                <Link to="i/arduino">
                    ARDUINO
                </Link>
                <br />
                <Link to="i/digital">
                    DIGITAL
                </Link>
            </div>
        )
    }
}

export default CreatorHome