import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import './LandingPage.css'; 

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Card className="landing-card" bordered={false}>
        <h1 className="title">Welcome to Assignment - 5</h1>
        <p className="description">This assignment helps manage products with filtering and confirmation features.</p>
        <Button className="navigate-button" type="primary" onClick={() => navigate('/home')}>
          Go to Home Page
        </Button>
      </Card>
    </div>
  );
};

export default LandingPage;
