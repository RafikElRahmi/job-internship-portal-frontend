import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./app.css";
import axios from "axios";
import { BaseURL } from "../../components/auth/BaseURL";
import {
  faEnvelope,
  faExclamationCircle,
  faGraduationCap,
  faPhone,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Admins = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userslist"));

  const [showUpgrade, setShowUpgrade] = useState(false);
  const handleupgrade = (id) => {
    localStorage.setItem("userid", JSON.stringify(id));
    setShowUpgrade(true);
  };
  const handleadmin = async () => {
    const request = { id: JSON.parse(localStorage.getItem("userid")) };
    await axios.post(`${BaseURL}deleteadmin`, request).then((res) => {
      if (res.data.status === 200) {
        const users = [...res.data.users];
        localStorage.setItem("userslist", JSON.stringify(users));
        localStorage.removeItem("userid");
        setShowUpgrade(false);
        navigate("/1KQ4vU4E9Fadmin/admins");
      }
    });
  };
  return (
    <Card className="bg-admins-admin p-3">
      <Modal
        show={showUpgrade}
        onHide={() => {
          setShowUpgrade(false);
          localStorage.removeItem("userid");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            className="text-center"
            style={{
              width: "100%",
            }}
          >
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ fontSize: "6rem" }}
            />
            <div className="text-center">Confirmation</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="pl-3">
            Are you sure you want to delete this admin?
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => {
              setShowUpgrade(false);
              localStorage.removeItem("userid");
            }}
          >
            No
          </Button>
          <Button variant="danger" className="px-5" onClick={handleadmin}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {users.length ? (
        <Container>
          {users.map((user) => {
            return (
              <Card key={user.id} className="mt-2">
                <Card.Body>
                  <Row
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Col xs="auto" style={{ width: "40px" }}>
                      <img
                        src={`data:image/png;base64,${user.photo}`}
                        width="30"
                        height="30"
                        className="rounded-circle mx-1"
                        alt="Profile"
                      />
                    </Col>
                    <Col style={{ flexGrow: 1 }} className="pt-2">
                      <Card.Subtitle className="mb-2 text-muted">
                        {user.name}
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
                          {user.created_at.slice(11, 16)} --{" "}
                          {user.created_at.slice(0, 10)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </Col>
                        <Col xs={3}>Email</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>{user.email}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faPhone} />
                        </Col>
                        <Col xs={3}>Phone</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>{user.phone}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="danger"
                    className="form-control"
                    onClick={() => handleupgrade(user.id)}
                  >
                    delete
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
              There is no admin yet!
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

export default Admins;
