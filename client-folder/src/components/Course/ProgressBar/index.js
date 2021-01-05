import React, { Component } from 'react';
import './styles.scss';


class ProgressBar extends Component {

    setProgress = () => {
        // console.log("Current Step");
        // console.log(this.props.currentNav);
        let currentNavLink = this.props.currentNav;
        
        if(currentNavLink === 'Introduction')
            return 0.5;
        else if(currentNavLink === 'BuildCircuit')
            return (17.17 + this.getBuildCircuitProgress());
        else if(currentNavLink === 'Experiment')
            return 33.83;
        else if(currentNavLink === 'ResultsAnalysis')
            return 50.5;
        else if(currentNavLink === 'Troubleshoot')
            return 67.17;
        else if(currentNavLink === 'Excercise')
            return 83.83;

        return 50;
    }

    getBuildCircuitProgress = () => {
        console.log("Current Step");
        let currStep = this.props;
        // console.log(this.props.buildCircuitSteps);
        console.log(currStep);
        
        return 0;
    }

    render() {

        var widthPercentage = this.setProgress() + "%";
        // console.log(widthPercentage)

        return (
            <div className="progress-bar"> 
                <div className="green-progress-bar" style={{width: widthPercentage}}></div>
            </div>
        )
    }

}

export default ProgressBar;