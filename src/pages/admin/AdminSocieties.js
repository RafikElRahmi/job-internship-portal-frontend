import React from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./app.css";
import axios from "axios";
import { BaseURL } from "../../components/auth/BaseURL";
import {
  faAddressCard,
  faFax,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminSocieties = () => {
  const navigate = useNavigate();
  const societies = JSON.parse(localStorage.getItem("userslist"));
  const handleprofile = async (email, username) => {
    const request = { email: email };
    const name = username.replace(/\s/g, "");
    await axios.post(`${BaseURL}postprofile`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate(`/1KQ4vU4E9Fadmin/profile/${name}`);
      } else {
        navigate("/1KQ4vU4E9Fadmin/posts/usernotfound");
      }
    });
  };
  const handleSociety = async (id) => {
    const request = { id: id };
    await axios.post(`${BaseURL}getuser`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("profile", JSON.stringify(res.data.user));
        navigate("/1KQ4vU4E9Fadmin/societies/profile");
      }
    });
  };
  return (
    <Card className="bg-societies-admin p-3">
      {societies.length ? (
        <Container>
          {societies.map((society) => {
            return (
              <Card key={society.id} className="mt-2">
                <Card.Body>
                  <Row
                    onClick={() => handleprofile(society.email, society.name)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Col xs="auto" style={{ width: "40px" }}>
                      <img
                        src={`data:image/png;base64,${society.photo}`}
                        width="30"
                        height="30"
                        className="rounded-circle mx-1"
                        alt="Profile"
                      />
                    </Col>
                    <Col style={{ flexGrow: 1 }} className="pt-2">
                      <Card.Subtitle className="mb-2 text-muted">
                        {society.name}
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faUserPlus} />
                        </Col>
                        <Col xs={3}>Created at</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>
                          {society.created_at.slice(11, 16)} --{" "}
                          {society.created_at.slice(0, 10)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faFax} />
                        </Col>
                        <Col xs={3}>Fax</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>{society.fax}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faAddressCard} />
                        </Col>
                        <Col xs={3}>Address</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>{society.adress}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="primary"
                    className="form-control"
                    onClick={() => handleSociety(society.id)}
                  >
                    View more
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      ) : (
        <Container>
          <Card className="mt-5">
            <Card.Body as="h2" className="text-black p-4 text-center">
              There is no user yet!
            </Card.Body>
            <Button
              className="m-4"
              onClick={() => navigate("/1KQ4vU4E9Fadmin")}
            >
              Go home
            </Button>
          </Card>
        </Container>
      )}
    </Card>
  );
};

export default AdminSocieties;
