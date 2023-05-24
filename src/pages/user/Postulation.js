import axios from "axios";
import React from "react";
import { Button, Card, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { BaseURL } from "../../components/auth/BaseURL";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Postulation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const postulation = JSON.parse(localStorage.getItem("post"));
  const handleprofile = async (email, author) => {
    const request = { email: email };
    const name = author.replace(/\s/g, "");
    await axios.post(`${BaseURL}postprofile`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate(`/user/profile/${name}`);
      } else {
        navigate("/user/posts/usernotfound");
      }
    });
  };
  const deletePostulation = async (id) => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const request = { email: data.email, id: id };
    await axios.post(`${BaseURL}deletepostulation`, request).then((res) => {
      localStorage.setItem(
        "postulations",
        JSON.stringify(res.data.postulations)
      );
      setShowConfirmation(false);
      navigate("/user/postulations");
    });
  };
  return (
    <Card className="bg-upgrade  d-flex align-items-center pt-2">
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
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
            Are you sure you want to delete this Postulation?
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => setShowConfirmation(false)}
          >
            No
          </Button>
          <Button
            variant="danger"
            className="px-5"
            onClick={() => deletePostulation(postulation.id)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="drop text-white p-3 mt-5" style={{ width: "70%" }}>
        <Card.Title className="text-center">My postulation</Card.Title>
        <Card.Body className="px-5">
          <Card key={postulation.id} className="mx-3 p-3">
            <Card.Body>
              <Row
                onClick={() =>
                  handleprofile(postulation.email, postulation.author)
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
                    {postulation.author} -{" "}
                    {postulation.created_at.slice(11, 16)} --{" "}
                    {postulation.created_at.slice(0, 10)}
                  </Card.Subtitle>
                </Col>
              </Row>
              <Card.Title className="text-black">
                {postulation.title}
              </Card.Title>
              <Card.Text className="text-black">
                {postulation.content}
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col xs={2}>Status</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={9}>
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
                  <Row>
                    <Col xs={4}>
                      {postulation.status === "pending" ? (
                        <Button
                          variant="warning"
                          className="px-5"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Withdraw
                        </Button>
                      ) : postulation.status === "approved" ? (
                        <Button
                          variant="warning"
                          className="px-5"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Delete
                        </Button>
                      ) : postulation.status === "rejected" ? (
                        <Button
                          variant="warning"
                          className="px-5"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </Col>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                      <Button
                        variant="secondary"
                        className="px-5"
                        onClick={() => navigate("/user/postulations")}
                      >
                        Go back
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Card>
  );
};

export default Postulation;
