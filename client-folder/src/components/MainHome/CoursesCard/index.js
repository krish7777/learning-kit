import { Card } from 'antd';
import React from 'react'
import { Link } from "react-router-dom";
import './styles.scss';

const CoursesCard = () => {

    const { Meta } = Card

    return (
        <div className="client-mainHome-card-container">
            <Link to="/arduino" className="client-mainHome-link" style={{borderRadius: 15}}>
                <Card
                    bordered={false}
                    hoverable
                    cover={<img alt="example" src="https://a.pololu-files.com/picture/0J7808.1200.jpg?8a7bee07ca7ffbb11e11f74e99f5c3a9" />}
                    style={{ backgroundColor: "rgba(130, 199, 254, 0.2)", borderRadius: 15 }}
                >
                    <p style={{ color: "white", margin: 0, textAlign: "center" }}>ARDUINO</p>
                </Card>
            </Link>

            <Link to="/digital" className="client-mainHome-link" style={{borderRadius: 15}}>
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
    )
}

export default CoursesCard;