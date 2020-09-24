import { Card } from 'antd';
import React from 'react'
import { Link } from "react-router-dom";

const MainHome = () => {

    const { Meta } = Card

    return (
        <div style={{ backgroundColor: "#001A2F", height: "100vh", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <Link to="/arduino">
                <Card
                    bordered={false}
                    hoverable
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    style={{ width: 240, padding: 0, backgroundColor: "rgba(130, 199, 254, 0.2)" }}
                >
                    <p style={{ color: "white", margin: 0, textAlign: "center" }}>ARDUINO</p>
                </Card>
            </Link>

            <Link to="/digital">
                <Card
                    bordered={false}
                    hoverable
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    style={{ width: 240, padding: 0, backgroundColor: "rgba(130, 199, 254, 0.2)" }}
                >
                    <p style={{ color: "white", margin: 0, textAlign: "center" }}>DIGITAL</p>
                </Card>
            </Link>

        </div >
    )
}

export default MainHome
