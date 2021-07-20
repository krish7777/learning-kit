import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { getVideoEmbed } from '../action';
import { bindActionCreators } from 'redux';

import './styles.scss';

class VideoEmbed extends Component {
    componentDidMount() {
        this.props.getVideoEmbed(this.props.id);
    }
    extractEmbed = (urlEmbed) => {
        // EG: src="https://www.youtube.com/embed/jario_gBJTw" LINK: https://www.youtube.com/watch?v=jario_gBJTw&t=10418s
        // EG: src="https://www.youtube.com/embed/EE7ug2okU-E" LINK: https://www.youtube.com/watch?v=EE7ug2okU-E
        // EG: src="https://www.youtube.com/embed/iGGolqb6gDE?list=PL2q4fbVm1Ik6DCzm9XZJbNwyHtHGclcEh"
        // LINK: https://www.youtube.com/watch?v=iGGolqb6gDE&list=PL2q4fbVm1Ik6DCzm9XZJbNwyHtHGclcEh&index=32

        let embedId = urlEmbed.split('v=')[1];
        let parameterStringList = embedId.split('&');
        if (parameterStringList.length > 1) {
            embedId = parameterStringList[0];
            let listString = parameterStringList.filter((parameterString) =>
                parameterString.includes('list')
            );
            if (listString.length > 0) {
                listString = listString[0].split('=')[1];
                embedId = `${parameterStringList[0]}?${listString}`;
            }
        }
        return embedId;
    };
    render() {
        if (this.props.videoembed) {
            console.log('getting embed', this.props.videoembed);
            const titleEmbed = this.props.videoembed.title;
            const urlEmbed = this.props.videoembed.url;

            let embedId = this.extractEmbed(urlEmbed);
            // let embedId = urlEmbed;

            console.log('embedId', embedId);
            return (
                <div>
                    <div className="video-responsive-container">
                        <iframe
                            className="youtube-player"
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${embedId}`}
                            // src={embedId} // wont work properly as youtube link cant be played directly without embed
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        {/* <div className="title-player">{titleEmbed}</div> */}
                        <div
                            className="title-player"
                            style={{
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                            }}
                        >
                            {titleEmbed}
                        </div>
                    </div>
                </div>
            );
        } else {
            const embedId = 'jNQXAC9IVRw';
            return (
                <div>
                    <div className="video-responsive-container">
                        <iframe
                            className="youtube-player"
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${embedId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                        <div className="title-player">
                            Your Video Is Loading...
                        </div>
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = (state) => ({
    videoembed: state.courseReducer.videoembed,
});

const mapDispatchToProps = (dispatch) => ({
    getVideoEmbed: bindActionCreators(getVideoEmbed, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoEmbed);
