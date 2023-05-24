import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormGroup,
  FormLabel,
  Row,
  Form,
} from "react-bootstrap";
import "../login/app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../components/auth/BaseURL";

function PostulationForm() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("userData"));
  const postid = JSON.parse(localStorage.getItem("postid"));
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const Submit = async (e) => {
    e.preventDefault();
    let email = null;
    if (data) {
      email = data.email;
    } else {
      email = null;
    }
    if (email && postid) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("email", email);
      formData.append("postid", postid);
      await axios.post(`${BaseURL}postulateuser`, formData).then((res) => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        const posts = [...res.data.posts].reverse();
        localStorage.setItem("userposts", JSON.stringify(posts));
        localStorage.removeItem("postid");
        if (storedData) {
          if (storedData.role === "admin") {
            navigate("/1KQ4vU4E9Fadmin/posts");
          } else if (storedData.role === "user") {
            navigate("/user/posts");
          } else if (storedData.role === "society") {
            navigate("/society/posts");
          }
        } else {
          navigate("/");
        }
      });
    }
  };

  return (
    <Card className="bg-apply ">
      <Container className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            <Form onSubmit={Submit}>
              <Card
                style={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Card.Title as="h3" className="text-center mt-3 text-white ">
                  Apply now
                </Card.Title>
                <Card.Body>
                  <FormGroup>
                    <FormLabel htmlFor="file" className="text-white ">
                      CV
                    </FormLabel>
                    <input
                      type="file"
                      id="file"
                      accept="application/pdf"
                      name="file"
                      className="form-control"
                      onChange={handleFileInput}
                      required
                    />
                  </FormGroup>
                  <Button type="submit" className="my-3">
                    send
                  </Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default PostulationForm;
