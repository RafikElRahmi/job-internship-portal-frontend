import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import './app.css'

const PostulationStatus = () => {
    const postulation = JSON.parse(localStorage.getItem("postulationsociety"));
    const status = postulation.statusPostulation;
  return (
    <Card
      className="bg-upgrade  d-flex align-items-center"
      style={{ paddingTop: "20vh" }}
    >
      <Card className="drop text-white p-3" style={{ width: "70%" }}>
        <Card.Title className="text-center">My postulation</Card.Title>
        <Card.Body className="px-5">
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "transparent" }}>
              <Row className="text-white">
                <Col xs={1}></Col>
                <Col xs={2}>Email</Col>
                <Col xs={1}>:</Col>
                <Col xs={7}>{postulation.email}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "transparent" }}>
              <Row className="text-white">
                <Col xs={1}></Col>
                <Col xs={2}>Adress</Col>
                <Col xs={1}>:</Col>
                <Col xs={7}>{postulation.adress}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "transparent" }}>
              <Row className="text-white">
                <Col xs={1}></Col>
                <Col xs={2}>Fax</Col>
                <Col xs={1}>:</Col>
                <Col xs={7}>{postulation.fax}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "transparent" }}>
              <Row className="text-white">
                <Col xs={1}></Col>
                <Col xs={2}>Status</Col>
                <Col xs={1}>:</Col>
                <Col xs={7}>
                  {status === "pending" ? (
                    <button
                      disabled
                      className="text-white py-1 px-3"
                      style={{ borderRadius: "4px", backgroundColor: "blue" }}
                    >
                      {status}
                    </button>
                  ) : status === "approved" ? (
                    <button
                      disabled
                      className="text-white py-1 px-3"
                      style={{ borderRadius: "4px", backgroundColor: "green" }}
                    >
                      {status}
                    </button>
                  ) : status === "rejected" ? (
                    <button
                      disabled
                      className="text-white py-1 px-3"
                      style={{ borderRadius: "4px", backgroundColor: "red" }}
                    >
                      {status}
                    </button>
                  ) : null}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Card>
  );
};

export default PostulationStatus;
