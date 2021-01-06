import React, { Component } from 'react';
import './styles.scss';


class ProgressBar extends Component {

    

    render() {
        return (
            <div className="progress-bar"> 
                <div className="green-progress-bar" style={{width: '50%'}}></div> 
            </div>
        )
    }

}

export default ProgressBar;