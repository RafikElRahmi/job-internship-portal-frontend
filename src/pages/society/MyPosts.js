import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { BaseURL } from "../../components/auth/BaseURL";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState(
    JSON.parse(localStorage.getItem("myposts"))
  );
  useEffect(() => {
    setposts(JSON.parse(localStorage.getItem("myposts")));
  }, []);
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
  const handlemodify = (post) => {
    localStorage.setItem("postmodify", JSON.stringify(post));
    navigate("/society/myposts/modify");
  };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDelete = (id) => {
    localStorage.setItem("postid", id);
    setShowConfirmation(true);
  };
  const DeletePost = async () => {
    const id = localStorage.getItem("postid");
    const request = { id: id };
    await axios.post(`${BaseURL}deletepost`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("postid");
        let newposts = JSON.parse(localStorage.getItem("myposts"));
        let index = 0;
        newposts.map((post) =>  {
          if (post.id == id) {
            newposts.splice(index, 1);
          }
          index++;
        });
        localStorage.setItem("myposts", JSON.stringify(newposts));
        setposts(newposts);
        setShowConfirmation(false);
      }
    });
  };
  return (
    <Card className="bg-profile">
      <Modal
        show={showConfirmation}
        onHide={() => {
          setShowConfirmation(false);
          localStorage.removeItem("postid");
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
          <Row className="pl-3">Are you sure you want to delete this Post?</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="px-5"
            onClick={() => {
              setShowConfirmation(false);
              localStorage.removeItem("postid");
            }}
          >
            No
          </Button>
          <Button
            variant="danger"
            className="px-5"
            onClick={() => DeletePost()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="p-4 mt-2" style={{ minHeight: "100vh" }}>
        {posts.length ? (
          posts.map((post) => {
            return (
              <Card key={post.id} className="mb-3 p-3">
                <Card.Body>
                  <Row
                    onClick={() => handleprofile(post.email, post.author)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Col xs="auto" style={{ width: "40px" }}>
                      <img
                        src={`data:image/png;base64,${post.photo}`}
                        width="30"
                        height="30"
                        className="rounded-circle mx-1"
                        alt="Profile"
                      />
                    </Col>
                    <Col style={{ flexGrow: 1 }} className="pt-2">
                      <Card.Subtitle className="mb-2 text-muted">
                        {post.author} - {post.created_at.slice(11, 16)} --{" "}
                        {post.created_at.slice(0, 10)}
                      </Card.Subtitle>
                    </Col>
                  </Row>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Row>
                    <Col xs={4}>
                      <Button
                        variant="primary"
                        style={{ width: "80%" }}
                        className="text-center"
                        onClick={() => handlemodify(post)}
                      >
                        Modify
                      </Button>
                    </Col>
                    <Col xs={4}></Col>
                    <Col xs={4}>
                      <Button
                        variant="danger"
                        style={{ width: "80%" }}
                        className="text-center"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <Card className="text-center mt-4">
            <Card.Title
              style={{ fontSize: "1.5rem", fontWeight: "700" }}
              className="p-4"
            >
              No posts
            </Card.Title>
          </Card>
        )}
      </Container>
    </Card>
  );
};

export default MyPosts;
