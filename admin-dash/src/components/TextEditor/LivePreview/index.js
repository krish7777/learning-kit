import React from 'react'
import { connect } from 'react-redux'
import "./styles.scss"

const LivePreview = ({ content }) => {
    return (
        <div className="live-preview">
            <h2 style={{ color: "white", textAlign: "center", margin: "20px 0" }}>Live Preview</h2>
            {/* <div className="live-preview-frame" dangerouslySetInnerHTML={{ __html: content }}></div> */}
            <div>{content}</div>
        </div>
    )
}

const mapStateToProps = state => ({
    content: state.textEditorReducer.content
})

export default connect(mapStateToProps)(LivePreview);
