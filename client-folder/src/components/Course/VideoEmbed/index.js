import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Component } from 'react';
import { getVideoEmbed } from '../action';
import { bindActionCreators } from 'redux';

import './styles.scss';

class VideoEmbed extends Component {
    componentDidMount() {
        console.log("VID PROP", this.props);
        this.props.getVideoEmbed(this.props.id);
    }
    render() {
        const videoembed = this.props;
        var embedId = "7sDY4m8KNLc";
        return (
            <div className="video-responsive">
                <iframe
                    width="853"
                    height="480"
                      src={`https://www.youtube.com/embed/${embedId}`}
                    // src={videoembed.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    videoembed: state.courseReducer.videoembed,
});

const mapDispatchToProps = (dispatch) => ({
    getVideoEmbed: bindActionCreators(getVideoEmbed, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoEmbed);
