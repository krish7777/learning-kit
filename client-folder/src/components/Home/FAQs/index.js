import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllModules, getSomeData, getAllFAQs } from '../action';
import { Button, Collapse } from 'antd';
const { Panel } = Collapse;

class FAQs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOrientation: 'landscape-primary',
            overlayUnread: true,
        };
    }

    setCurrentOrientation = (orientation) => {
        this.setState({ currentOrientation: orientation });
    };

    setOverlayUnread = () => {
        console.log('the setoverlay main function called');
        this.setState({ overlayUnread: false });
    };

    getOppositeOrientation = () => {
        const { type } = window.screen.orientation;
        return type.startsWith('portrait') ? 'landscape' : 'portrait';
    };

    rotate = async (lockButton) => {
        try {
            await this.fullScreenCheck();
        } catch (err) {
            console.error(err);
        }
        const newOrientation = this.getOppositeOrientation();
        await window.screen.orientation.lock(newOrientation);
    };

    fullScreenCheck = () => {
        if (document.fullscreenElement) {
            return this.closeFullscreen();
        }
        return document.documentElement.requestFullscreen();
    };

    closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }
    };
    componentDidMount() {
        this.props.getAllFAQs(this.props.match.params.type);
    }

    render() {
        // console.log('FAQSLOGGED: ' + JSON.stringify(this.props.allFAQs.faqs));
        const { allFAQs } = this.props;
        const { currentOrientation } = this.state;

        return currentOrientation === 'portrait-primary' ? (
            <button id="button" onClick={this.rotate}>
                Please click to rotate the screen
            </button>
        ) : (
                // HEADER

                <div className="course">
                    {/* <div className="header">
                        <Link
                            to={`/${this.props.match.params.type}/modules`}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.75 25H25V18.75H18.75V25ZM18.75 15.625H25V9.375H18.75V15.625ZM9.375 6.25H15.625V0H9.375V6.25ZM18.75 6.25H25V0H18.75V6.25ZM9.375 15.625H15.625V9.375H9.375V15.625ZM0 15.625H6.25V9.375H0V15.625ZM0 25H6.25V18.75H0V25ZM9.375 25H15.625V18.75H9.375V25ZM0 6.25H6.25V0H0V6.25Z"
                                    fill="#9FB8CC"
                                />
                            </svg>
                        </Link>
                        <Link
                            to={`/${this.props.match.params.type}`}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <svg
                                width="30"
                                height="25"
                                viewBox="0 0 30 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.7059 3.95588L22.0588 10.5735V22.0588H19.1176V13.2353H10.2941V22.0588H7.35294V10.5735L14.7059 3.95588ZM14.7059 0L0 13.2353H4.41176V25H13.2353V16.1765H16.1765V25H25V13.2353H29.4118L14.7059 0Z"
                                    fill="#9FB8CC"
                                />
                            </svg>
                        </Link>
                        <p className="course-name">
                            {this.props.match.params.type}
                        </p>
                        <svg
                            width="26"
                            height="25"
                            viewBox="0 0 26 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.6784 0V2.93615C19.7976 4.16192 22.805 7.98176 22.805 12.5C22.805 17.0182 19.7976 20.8238 15.6784 22.0496V25C21.3797 23.703 25.6556 18.6003 25.6556 12.5C25.6556 6.39966 21.3797 1.29704 15.6784 0ZM19.2417 12.5C19.2417 9.97719 17.8164 7.81072 15.6784 6.75599V18.2013C17.8164 17.1893 19.2417 15.0086 19.2417 12.5ZM0 8.22406V16.7759H5.70125L12.8278 23.9025V1.09749L5.70125 8.22406H0Z"
                                fill="#9FB8CC"
                            />
                        </svg>

                        <div
                            onClick={this.fullScreenCheck}
                            style={{ cursor: 'pointer' }}
                        >
                            <svg
                                width="26"
                                height="25"
                                viewBox="0 0 26 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.655762 0H9.58433V3.57143H4.22719V8.92857H0.655762V0ZM16.7272 0H25.6558V8.92857H22.0843V3.57143H16.7272V0ZM22.0843 16.0714H25.6558V25H16.7272V21.4286H22.0843V16.0714ZM9.58433 21.4286V25H0.655762V16.0714H4.22719V21.4286H9.58433Z"
                                    fill="#9FB8CC"
                                />
                            </svg>
                        </div>
                    </div> */}

                    {/* FAQSLOGGED */}

                    <div className="body">
                        <div className="body-padder">
                            {allFAQs.length === 0 ? (
                                <div style={{ margin: '1em auto' }}>Loading FAQs</div>
                            ) : (
                                    <div className="troubleshoot-container">
                                        <h2 className="heading-troubleshoot">
                                            Listed FAQs:
                            </h2>
                                        <div className="troubleshoot">
                                            <div className="troubleshoot-inner">
                                                {allFAQs?.faqs?.map((singlefaq, i) =>
                                                    singlefaq.question ? (
                                                        <Collapse
                                                            ghost
                                                            expandIconPosition={'right'}
                                                            key={singlefaq.question + i}
                                                        >
                                                            <Panel
                                                                header={
                                                                    i +
                                                                    1 +
                                                                    '. ' +
                                                                    singlefaq.question
                                                                }
                                                                style={{
                                                                    border:
                                                                        '1px solid #403F3E',
                                                                }}
                                                            >
                                                                <div
                                                                    className="exp-introduction troubleshoot-panel"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            singlefaq.answer,
                                                                    }}
                                                                ></div>
                                                            </Panel>
                                                        </Collapse>
                                                    ) : (
                                                            <Collapse
                                                                activeKey={'0'}
                                                                ghost
                                                                expandIconPosition={'right'}
                                                            >
                                                                <Panel
                                                                    header={singlefaq.question}
                                                                    style={{
                                                                        border:
                                                                            '1px solid #403F3E',
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="exp-introduction troubleshoot-panel"
                                                                        dangerouslySetInnerHTML={{
                                                                            __html:
                                                                                singlefaq.answer,
                                                                        }}
                                                                    ></div>
                                                                </Panel>
                                                            </Collapse>
                                                        )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* FOOTER */}

                    {/* <div className="footer">
                    <p>Copyright</p>
                    <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.75 10H11.25V5H13.75V10ZM13.75 12.5H11.25V15H13.75V12.5ZM25 2.5V17.5C25 18.163 24.7366 18.7989 24.2678 19.2678C23.7989 19.7366 23.163 20 22.5 20H5L0 25V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H22.5C23.163 0 23.7989 0.263392 24.2678 0.732233C24.7366 1.20107 25 1.83696 25 2.5ZM22.5 2.5H2.5V19L4 17.5H22.5V2.5Z"
                            fill="#002E48"
                        />
                    </svg>
                </div> */}
                </div>
            );
    }
}
const mapStateToProps = (state) => ({
    someData: state.homeReducer.someData,
    allCourses: state.homeReducer.allCourses,
    allModules: state.homeReducer.allModules,
    allFAQs: state.homeReducer.allFAQs,
});

const mapDispatchToProps = (dispatch) => ({
    getSomeData: bindActionCreators(getSomeData, dispatch),
    getAllModules: bindActionCreators(getAllModules, dispatch),
    getAllFAQs: bindActionCreators(getAllFAQs, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FAQs);
