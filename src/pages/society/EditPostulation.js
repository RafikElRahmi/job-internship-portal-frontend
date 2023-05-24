import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Card, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../components/auth/BaseURL";

const EditPostulation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const navigate = useNavigate();
  const postulation = JSON.parse(localStorage.getItem("postulation"));
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
  const editPostulation = async (id, status) => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const request = { email: data.email, id: id, status: status };
    await axios.post(`${BaseURL}editpostulation`, request).then((res) => {
      const postulations = [...res.data.postulation].reverse();
      localStorage.setItem("societypostulations", JSON.stringify(postulations));
      setShowConfirmation(false);
      setShowRejection(false);
      navigate("/society/postulations");
    });
    };
    const handleCVdownload = async () => {
        const request = { path: postulation.filepath };
        await axios.post(`${BaseURL}downloadcv`, request).then((res) => { 
            const file = res.data.file
            const link = document.createElement("a");
            link.href = `data:pdf/png;base64,${file}`
            link.setAttribute("download", 'CV.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }
  return (
    <Card className="bg-postule  d-flex align-items-center pt-2">
      <Modal show={showRejection} onHide={() => setShowRejection(false)}>
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
            <div className="text-center">Rejection</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="pl-3">
            Are you sure you want to Reject this User postulation?
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => setShowRejection(false)}
          >
            No
          </Button>
          <Button
            variant="danger"
            className="px-5"
            onClick={() => editPostulation(postulation.id, "rejected")}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
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
            <div className="text-center">Approval</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="pl-3">
            Are you sure you want to approve this User postulation?
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
            onClick={() => editPostulation(postulation.id, "approved")}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="drop text-white p-3 mt-5" style={{ width: "70%" }}>
        <Card.Title className="text-center">Postulation details</Card.Title>
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
                          className="text-white px-5 py-1"
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
                          className="text-white px-5 py-1"
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
                          className="text-white px-5 py-1"
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
                  <Row className="mt-2">
                    <Col xs={2}>CV</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={9}>
                      <Button variant="primary" onClick={handleCVdownload}>
                        Download CV
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {postulation.status === "pending" ? (
                    <Row>
                      <Col xs={4}>
                        <Button
                          style={{ backgroundColor: "green", width: "100%" }}
                          className="text-center"
                          onClick={() => setShowConfirmation(true)}
                        >
                          Approve
                        </Button>
                      </Col>
                      <Col xs={4}>
                        <Button
                          style={{ backgroundColor: "red", width: "100%" }}
                          className="text-center"
                          onClick={() => setShowRejection(true)}
                        >
                          Reject
                        </Button>
                      </Col>
                      <Col xs={4}>
                        <Button
                          variant="secondary"
                          style={{ width: "100%" }}
                          className="text-center"
                          onClick={() => navigate("/society/postulations")}
                        >
                          Go back
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col xs={4}></Col>
                      <Col xs={4}></Col>
                      <Col xs={4}>
                        <Button
                          variant="secondary"
                          style={{ width: "100%" }}
                          className="text-center"
                          onClick={() => navigate("/society/postulations")}
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
        </Card.Body>
      </Card>
    </Card>
  );
};

export default EditPostulation;
