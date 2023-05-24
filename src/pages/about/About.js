import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
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
  };

  return (
    <Card className="bg-img">
      <Row className="justify-content-center mt-5">
        <Col xs={10} md={8} lg={6}>
          <Card
            className="p-5 mb-3"
            style={{
              backgroundColor: "transparent",
              backdropFilter: "blur(5px)",
            }}
          >
            <h1
              className="text-center"
              style={{
                color: "bleu",
              }}
            >
              Welcome to FS FAST
            </h1>
            <p className="text-left">
              Searching for jobs and internships can be a daunting task,
              especially when it comes to finding the right platform. With so
              many job boards and career sites out there, it can be difficult to
              know which one is best suited for your needs. Fortunately,
              platforms like FS FAST have made it easier to find the perfect
              opportunity.
            </p>
            <p>
              FS FAST helps you
              find job postings that match your skillset and interests – making
              the process of job searching faster and more efficient. With
              FS FAST, you can easily search through thousands of jobs and
              internships in just a few clicks – allowing you to quickly find
              the perfect position for you.
            </p>
            <p className="text-left">
              If you have any questions or concerns, please don't hesitate to
              reach out to us. We are here to help you every step of the way and
              ensure that you have a successful job search or educational
              journey. Thank you for choosing FS FAST as your partner in career
              development!
            </p>
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" onClick={handleNavigate}>
                Go Back to Homepage
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default About;
