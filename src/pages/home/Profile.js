import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../components/auth/BaseURL";
import { useAuth } from "../../components/auth/Auth";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import {
  faEnvelope,
  faGraduationCap,
  faPhone,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfilePage() {
  const auth = useAuth();
  const [profile, setprofile] = useState(localStorage.getItem("photo"));
  const user = JSON.parse(localStorage.getItem("userData"));
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append(
      "email",
      JSON.parse(localStorage.getItem("userData")).email
    );
    await axios
      .post(`${BaseURL}setphoto`, formData)
      .then((response) => {
        setprofile(response.data);
      })
      .then(() => {
        auth.refresh();
      })
  };

  return (
    <Container className="my-5">
      <Row>
        <Col xs={2} />
        <Col xs={8}>
          <Card>
            <Card.Header className="text-center" style={{ fontSize: "40px" }}>
              Profile informations
            </Card.Header>
            <Image
              src={`data:image/png;base64,${profile}`}
              roundedCircle
              style={{
                width: "50%",
                height: "width",
                margin: "auto",
                marginTop: "1rem",
              }}
            />
            <Card.Body>
              <Row>
                <Col>
                  <Button
                    variant="primary"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      padding: "0",
                    }}
                  >
                    <input
                      type="file"
                      className="custom-file-input"
                      onChange={handleFileInput}
                      style={{ zIndex: 1, cursor: "pointer" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "5px",
                        left: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      Profile photo
                    </span>
                  </Button>
                </Col>
                <Col className="text-right">
                  <Button variant="primary" onClick={handleUploadImage}>
                    Update
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={2} />
      </Row>
      <Row>
        <Col xs={2} />

        <Col xs={8}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faUser} />
                    </Col>
                    <Col xs={3}>Firstname</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={7}>{user.firstname}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col xs={1}>
                      <FontAwesomeIcon icon={faUserAlt} />
                    </Col>
                    <Col xs={3}>Lastname</Col>
                    <Col xs={1}>:</Col>
                    <Col xs={7}>{user.lastname}</Col>
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
                {user.fax ? (
                  <ListGroup.Item>
                    <Row>
                      <Col xs={1}>
                        <FontAwesomeIcon icon={faGraduationCap} />
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
                {user.adress ? (
                  <ListGroup.Item>
                    <Row>
                      <Col xs={1}>
                        <FontAwesomeIcon icon={faGraduationCap} />
                      </Col>
                      <Col xs={3}>Address</Col>
                      <Col xs={1}>:</Col>
                      <Col xs={7}>{user.adress}</Col>
                    </Row>
                  </ListGroup.Item>
                ) : null}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={2} />
      </Row>
    </Container>
  );
}

export default ProfilePage;
