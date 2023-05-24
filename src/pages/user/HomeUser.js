import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Bachelor from "../../images/Bachelor.png";
import Doctorate from "../../images/Doctorate.png";
import Master from "../../images/Master.png";
import Ai from "../../images/Ai.png";
import Cyber from "../../images/Cyber.png";
import Network from "../../images/Network.png";
import Programming from "../../images/Programming.png";
import DataScience from "../../images/DataScience.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../components/auth/BaseURL";

const HomeUser = () => {
  const navigate = useNavigate();
  const handleclick = async (values) => {
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user) {
      const request = {
        email: user.email,
        education: values.education,
        section: values.section,
      };
      localStorage.setItem("categories", JSON.stringify(request));
      await axios.post(`${BaseURL}filterposts`, request).then((res) => {
        const posts = [...res.data.posts].reverse();
        localStorage.setItem("userposts", JSON.stringify(posts));
        navigate("/user/posts/");
      });
    } else {
      navigate('/login')
    }
  };
  return (
    <Container>
      <Card className="p-3 m-3 d-flex justify-content-center">
        <Card.Header
          className="text-center"
          style={{ fontSize: "1.5em", fontWeight: "700" }}
        >
          Choose education
        </Card.Header>
        <Row className="p-3 m-3 d-flex justify-content-center">
          <Col>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Bachelor}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Bachelor's degree </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({
                      education: "Bachelor's degree",
                      section: "all",
                    })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Master}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Master's degree </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({
                      education: "Master's degree",
                      section: "all",
                    })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Doctorate}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Doctorate degree </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({
                      education: "Doctorate degree",
                      section: "all",
                    })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card className="p-3 m-3">
        <Card.Header
          className="text-center"
          style={{ fontSize: "1.5em", fontWeight: "700" }}
        >
          Choose section
        </Card.Header>
        <Row className="p-3 m-3 d-flex justify-content-center">
          <Col>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Programming}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Computer programming </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({
                      education: "all",
                      section: "Computer programming",
                    })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Network}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Computer network </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({
                      education: "all",
                      section: "Computer network",
                    })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Ai}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Artificial intelligence </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({
                      education: "all",
                      section: "Artificial intelligence",
                    })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="p-3 m-3 d-flex justify-content-center">
          <Col xs={4}>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={DataScience}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Data science </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({ education: "all", section: "Data science" })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card
              style={{ width: "18rem" }}
              className="d-flex align-items-center"
            >
              <Card.Img
                variant="top"
                src={Cyber}
                style={{
                  marginTop: "10px",
                  width: "70%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>Cyber security </Card.Title>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleclick({ education: "all", section: "Cyber security" })
                  }
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default HomeUser;
