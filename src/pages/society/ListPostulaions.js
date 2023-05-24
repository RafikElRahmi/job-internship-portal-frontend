import React from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import "./app.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../components/auth/BaseURL";

function ListPostulations() {
  const navigate = useNavigate();
  const postulations = JSON.parse(localStorage.getItem("societypostulations"));
  const handleprofile = async (email, author) => {
    const request = { email: email };
    const name = author.replace(/\s/g, "");
    await axios.post(`${BaseURL}postprofile`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate(`/society/profile/${name}`);
      } else {
        navigate("/society/posts/usernotfound");
      }
    });
  };
  const handlepostulation = async(id) => {
    const request = {idpostulation : id }
    await axios.post(`${BaseURL}getpostsociety`, request).then((res) => {
      localStorage.setItem("postulation", JSON.stringify(res.data.postulation));
      navigate("/society/postulation");
    });
  }
  return (
    <Card className="bg-postulations">
      {postulations.length ? (
        <Container className="">
          {postulations.map((postulation) => {
            return (
              <Card key={postulation.id} className="m-3 p-3">
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
                  <Card.Title className="text-black ml-3 p-1">
                    {postulation.title}
                  </Card.Title>
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
                    </ListGroup.Item>
                    <Row className="px-4 mt-1">
                      <Button onClick={() => handlepostulation(postulation.id)}>
                        View more
                      </Button>
                    </Row>
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
            <Button className="m-4" onClick={() => navigate("/society")}>
              Go home
            </Button>
          </Card>
        </Container>
      )}
    </Card>
  );
}
export default ListPostulations;
