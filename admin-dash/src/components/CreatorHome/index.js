import { Card, Layout, Menu } from 'antd';
import React from "react"
import { Link } from "react-router-dom"
import { COURSE } from "../../config"
import './index.scss';
// import SignUpForm from "../Auth"

class CreatorHome extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            // <div className="client-mainHome-container" style={{ backgroundColor: "#001A2F", height: "100vh", alignItems: "center" }}>
            <Layout style={{ backgroundColor: "#001A2F" }}>
                {/* <SignUpForm/> */}
                <div className="client-mainHome-container" style={{ backgroundColor: "#001A2F", minHeight: "calc( 100vh - 46px )", alignItems: "center" }}>
                    <h1 style={{ color: "white", fontWeight: "bolder", fontSize: "48px" }} className="lineContainer">CREATOR HOME</h1>
                    <Link to="/admin/arduino" className="client-mainHome-link" style={{ borderRadius: 15 }}>
                        <Card
                            bordered={false}
                            hoverable
                            cover={<img alt="example" src="https://a.pololu-files.com/picture/0J7808.1200.jpg?8a7bee07ca7ffbb11e11f74e99f5c3a9" />}
                            style={{ backgroundColor: "rgba(130, 199, 254, 0.2)", borderRadius: 15 }}
                        >
                            <p style={{ color: "white", margin: 0, textAlign: "center" }}>ARDUINO</p>
                        </Card>
                    </Link>

                    <Link to="/admin/digital" className="client-mainHome-link" style={{ borderRadius: 15 }}>
                        <Card
                            bordered={false}
                            hoverable
                            cover={<img alt="example" src="https://www.ie.edu/insights/wp-content/uploads/2017/05/Prueba-y-aprendizaje-transformacion-cultural-en-la-era-digital.jpg" />}
                            style={{ backgroundColor: "rgba(130, 199, 254, 0.2)", borderRadius: 15 }}
                        >
                            <p style={{ color: "white", margin: 0, textAlign: "center" }}>DIGITAL</p>
                        </Card>
                    </Link>
                </div>
            </Layout >
        )
    }
}

export default CreatorHome