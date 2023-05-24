import {
  faAddressCard,
  faEnvelope,
  faExclamationCircle,
  faFax,
  faGraduationCap,
  faPhone,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
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
import { BaseURL } from "../../components/auth/BaseURL";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const handleupgrade = () => {
    setShowUpgrade(true);
  };
  const handledelete = () => {
    setShowConfirmation(true);
  };
  const UpgradeUser = async () => {
    const request = { id: JSON.parse(localStorage.getItem("profile")).id };
    await axios.post(`${BaseURL}upgradeuser`, request).then((res) => {
        const users = [...res.data.users];
        localStorage.setItem("userslist", JSON.stringify(users));
        navigate("/1KQ4vU4E9Fadmin/users");
    });
  };
  const DeleteUser = async () => {
    const request = { id: JSON.parse(localStorage.getItem("profile")).id };
    await axios.post(`${BaseURL}deleteuser`, request).then((res) => {
      if (res.data.role === "user") {
        const users = [...res.data.users];
        localStorage.setItem("userslist", JSON.stringify(users));
        navigate("/1KQ4vU4E9Fadmin/users");
      } else if (res.data.role === "society") {
        const users = [...res.data.users];
        localStorage.setItem("userslist", JSON.stringify(users));
        navigate("/1KQ4vU4E9Fadmin/societies");
      }
    });
  };
  return (
    <Card className="bg-profileposts">
      <Modal
        show={showUpgrade}
        onHide={() => {
          setShowUpgrade(false);
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
            Are you sure you want to make this User as admin?
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => {
              setShowUpgrade(false);
            }}
          >
            No
          </Button>
          <Button variant="danger" className="px-5" onClick={UpgradeUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showConfirmation}
        onHide={() => {
          setShowConfirmation(false);
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
          {user.role === "user" ? (
            <Row className="pl-3">
              Are you sure you want to delete this User?
            </Row>
          ) : (
            <Row className="pl-3">
              Are you sure you want to delete this Society?
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            className="px-5"
            onClick={() => DeleteUser()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Card className="m-5 p-3 ">
          {user.role === "user" ? (
            <Card.Title className="text-center">User informations</Card.Title>
          ) : (
            <Card.Title className="text-center">
              Society informations
            </Card.Title>
          )}

          <Card.Body>
            <Row>
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
              <ListGroup.Item>
                <Row>
                  <Col xs={1}>
                    <FontAwesomeIcon icon={faUserTie} />
                  </Col>
                  <Col xs={3}>Role</Col>
                  <Col xs={1}>:</Col>
                  <Col xs={7}>{user.role}</Col>
                </Row>
              </ListGroup.Item>
              {user.adress ? (
                <ListGroup.Item>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faAddressCard} />
                    </Col>
                    <Col xs={3}>Address</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={7}>{user.adress}</Col>
                  </Row>
                </ListGroup.Item>
              ) : null}
              {user.fax ? (
                <ListGroup.Item>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faFax} />
                    </Col>
                    <Col xs={3}>Fax</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={7}>{user.fax}</Col>
                  </Row>
                </ListGroup.Item>
              ) : null}
              {user.education ? (
                <ListGroup.Item>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </Col>
                    <Col xs={3}>Education</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={7}>{user.education}</Col>
                  </Row>
                </ListGroup.Item>
              ) : null}
              {user.section ? (
                <ListGroup.Item>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faGraduationCap} />
                    </Col>
                    <Col xs={3}>Section</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={7}>{user.section}</Col>
                  </Row>
                </ListGroup.Item>
              ) : null}
              <ListGroup.Item>
                {user.role === "user" ? (
                  <Row className="text-center mt-2">
                    <Col xs={4}>
                      <Button
                        variant="primary"
                        className="mx-3"
                        style={{ width: "100%" }}
                        onClick={handleupgrade}
                      >
                        Up to admin
                      </Button>
                    </Col>
                    <Col xs={4}>
                      <Button
                        variant="danger"
                        className="mx-3"
                        style={{ width: "100%" }}
                        onClick={handledelete}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col xs={4}>
                      <Button
                        variant="secondary"
                        className="mx-3"
                        style={{ width: "100%" }}
                        onClick={() => {
                          navigate("/1KQ4vU4E9Fadmin/users");
                          localStorage.removeItem("profile");
                        }}
                      >
                        Go back
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Row className="text-center mt-2">
                    <Col xs={4}>
                      <Button
                        variant="danger"
                        className="mx-3"
                        style={{ width: "100%" }}
                        onClick={handledelete}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                      <Button
                        variant="secondary"
                        className="mx-3"
                        style={{ width: "100%" }}
                        onClick={() => {
                          navigate("/1KQ4vU4E9Fadmin/societies");
                          localStorage.removeItem("profile");
                        }}
                      >
                        Go back
                      </Button>
                    </Col>
                  </Row>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </Card>
  );
};

export default UserProfile;
