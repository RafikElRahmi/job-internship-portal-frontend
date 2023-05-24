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
import "./app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../components/auth/BaseURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faExclamationCircle,
  faFax,
  faPersonCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AdminPostulations = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const postulations = JSON.parse(localStorage.getItem("postulations"));
  const handleprofile = async (email, author) => {
    const request = { email: email };
    const name = author.replace(/\s/g, "");
    await axios.post(`${BaseURL}postprofile`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate(`/1KQ4vU4E9Fadmin/profile/${name}`);
      } else {
        navigate("/1KQ4vU4E9Fadmin/usernotfound");
      }
    });
  };
  const handleReject = async () => {
    const id = JSON.parse(localStorage.getItem("postualtionid"));
    const request = { id: id, state: "rejected" };
    await axios
      .post(`${BaseURL}editsocietypostulation`, request)
      .then((res) => {
        const postulations = [...res.data.postulations];
        localStorage.setItem("postulations", JSON.stringify(postulations));
        localStorage.removeItem("postualtionid");
        setShowRejection(false);
      });
  };
  const handleApprove = async () => {
    const id = JSON.parse(localStorage.getItem("postualtionid"));
    const request = { id: id, state: "approved" };
    await axios
      .post(`${BaseURL}editsocietypostulation`, request)
      .then((res) => {
        const postulations = [...res.data.postulations];
        localStorage.setItem("postulations", JSON.stringify(postulations));
        localStorage.removeItem("postualtionid");
        setShowConfirmation(false);
      });
  };
  return (
    <Card className="bg-postulations-admin text-white p-3">
      <Modal
        show={showConfirmation}
        onHide={() => {
          setShowConfirmation(false);
          localStorage.removeItem("postualtionid");
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
            Are you sure you want to approve this user as society?
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => {
              setShowConfirmation(false);
              localStorage.removeItem("postualtionid");
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            className="px-5"
            onClick={() => handleApprove()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showRejection}
        onHide={() => {
          setShowRejection(false);
          localStorage.removeItem("postualtionid");
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
            Are you sure you want to reject this user as society?
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => {
              setShowRejection(false);
              localStorage.removeItem("postualtionid");
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            className="px-5"
            onClick={() => handleReject()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {postulations.length ? (
        <Container>
          {postulations.map((postulation) => {
            return (
              <Card key={postulation.id} className="m-3 p-1 ">
                <Card.Body>
                  <Row
                    onClick={() =>
                      handleprofile(postulation.email, postulation.name)
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Col xs="auto" style={{ width: "40px" }}>
                      <img
                        src={`data:image/png;base64,${postulation.photo}`}
                        width="30"
                        height="30"
                        className="rounded-circle mx-1"
                        alt="Profile"
                      />
                    </Col>
                    <Col style={{ flexGrow: 1 }} className="pt-2">
                      <Card.Subtitle className="mb-2 text-muted">
                        {postulation.name} -{" "}
                        {postulation.created_at.slice(11, 16)} --{" "}
                        {postulation.created_at.slice(0, 10)}
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faAddressCard} />
                        </Col>
                        <Col xs={3}>Address</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>{postulation.adress}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faFax} />
                        </Col>
                        <Col xs={3}>Fax</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>{postulation.fax}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col xs={1}>
                          <FontAwesomeIcon icon={faPersonCircleCheck} />
                        </Col>
                        <Col xs={3}>Status</Col>
                        <Col xs={1}>:</Col>
                        <Col xs={7}>
                          {postulation.status === "pending" ? (
                            <button
                              disabled
                              className="text-white px-3"
                              style={{
                                borderRadius: "4px",
                                backgroundColor: "blue",
                              }}
                            >
                              {postulation.status}
                            </button>
                          ) : postulation.status === "approved" ? (
                            <button
                              disabled
                              className="text-white px-3"
                              style={{
                                borderRadius: "4px",
                                backgroundColor: "green",
                              }}
                            >
                              {postulation.status}
                            </button>
                          ) : postulation.status === "rejected" ? (
                            <button
                              disabled
                              className="text-white px-3"
                              style={{
                                borderRadius: "4px",
                                backgroundColor: "red",
                              }}
                            >
                              {postulation.status}
                            </button>
                          ) : null}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {postulation.status === "pending" ? (
                        <Row>
                          <Col xs={4}>
                            <Button
                              style={{
                                backgroundColor: "green",
                                width: "100%",
                              }}
                              className="text-center"
                              onClick={() => {
                                localStorage.setItem(
                                  "postualtionid",
                                  JSON.stringify(postulation.id)
                                );
                                setShowConfirmation(true);
                              }}
                            >
                              Approve
                            </Button>
                          </Col>
                          <Col xs={4}></Col>
                          <Col xs={4}>
                            <Button
                              style={{ backgroundColor: "red", width: "100%" }}
                              className="text-center"
                              onClick={() => {
                                localStorage.setItem(
                                  "postualtionid",
                                  JSON.stringify(postulation.id)
                                );
                                setShowRejection(true);
                              }}
                            >
                              Reject
                            </Button>
                          </Col>
                        </Row>
                      ) : null}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      ) : (
        <Container>
          <Card className="mt-5">
            <Card.Body as="h2" className="text-black p-4 text-center">
              There is no postulations yet!
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

export default AdminPostulations;
