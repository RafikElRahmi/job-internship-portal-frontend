import React from "react";
import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import {
  faAddressCard,
  faEnvelope,
  faFax,
  faGraduationCap,
  faPhone,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function ProfileFromPosts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    navigate("/user/posts/usernotfound");
  }
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
              src={`data:image/png;base64,${user.photo}`}
              roundedCircle
              style={{
                width: "50%",
                height: "width",
                margin: "auto",
                marginTop: "1rem",
              }}
            />
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
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={2} />
      </Row>
    </Container>
  );
}

export default ProfileFromPosts;
