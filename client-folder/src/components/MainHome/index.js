import {Card} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
const MainHome = () => {
  const {Meta} = Card;

  return (
    <div
      style={{
        backgroundColor: '#001A2F',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Link to="/arduino" className="client-mainHome-link">
        <Card
          bordered={false}
          hoverable
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
          className="client-mainHome-card"
        >
          <p style={{color: 'white', margin: 0, textAlign: 'center'}}>
            ARDUINO
          </p>
        </Card>
      </Link>

      <Link to="/digital" className="client-mainHome-link">
        <Card
          bordered={false}
          hoverable
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
          className="client-mainHome-card"
        >
          <p
            style={{
              color: 'white',
              margin: 0,
              textAlign: 'center',
              textDecoration: 'bold',
            }}
          >
            DIGITAL
          </p>
        </Card>
      </Link>

    </div>
  );
};

export default MainHome;
