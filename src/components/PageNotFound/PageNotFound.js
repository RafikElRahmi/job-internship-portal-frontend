import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate()
  const handleNavigate = () => {
    const auth = JSON.parse(localStorage.getItem("userData"));
    if (auth) {
      if (auth.role === "admin") {
        navigate("/1KQ4vU4E9Fadmin");
      } else if (auth.role === "user") {
        navigate("/user");
      } else if (auth.role === "society") {
        navigate("/society");
      }
    } else {
        navigate("/");
    }
  }
  
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={8} lg={6}>
          <h1 className="text-center">Page Not Found</h1>
          <p className="text-center">
            Sorry, the page you are looking for does not exist.
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" onClick={handleNavigate}>Go Back to Homepage</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
