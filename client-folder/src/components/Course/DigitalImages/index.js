import React, { useState, useEffect } from 'react';
import './styles.scss';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { connect } from 'react-redux';

const DigitalImages = ({ stepNo, showSide, steps }) => {
    const [sideImages, setSideImages] = useState([]);

    useEffect(() => {
        const img = [];
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].upload_side.length > 0) {
                img.push({
                    currIndex: i,
                    original: steps[i].upload_side[0].response.location,
                });
            }
        }
        setSideImages(img);
    }, [steps]);
    let currOriginal = null;
    for (let i = 0; i < sideImages.length; i++) {
        if (stepNo >= sideImages[i].currIndex)
            currOriginal = sideImages[i].original;
    }
    return (
        <div
            className="digital-images-code-editor"
            style={showSide ? { width: '35%' } : { width: '0%', padding: 0 }} >

            {/* <div style={{ flex: 1, backgroundColor: 'white' }}> */}
            <img
                src={currOriginal}
            // style={{
            //     height: '98%',
            //     width: '100%',
            //     margin: '0%',
            // }}
            ></img>
            {/* </div> */}

        </div>
    );
};
// upload_side: (1) […]
// 0: {…}
// _id: "5f943c102d53234960963e6a"
// name: "IDE Editor.png"
// response: {…}
// ​​​​​​​
// location: "http://localhost:3300/images/experiment/1602061825495-blob.png"
// ​​​​​​​
// originalName:
const mapStateToProps = (state) => ({
    showSide: state.courseReducer.showSide,
    stepNo: state.courseReducer.stepNo,
});

export default connect(mapStateToProps)(DigitalImages);
