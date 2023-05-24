import React from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import './Home.css'
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate()
  return (
    <Card className="ims">
      <Row>
        <Col xs={3}>
          <ButtonGroup
            vertical
            className="mr-4"
            style={{ bottom: "30px", right: "30px" }}
          >
            <Button
              variant="warning"
              className="m-1"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="warning"
              className="m-1"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              variant="warning"
              className="m-1"
              onClick={() => navigate("/about")}
            >
              About
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Card>
  );
};

export default Home;
