import React, { useEffect, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Col, Container, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as yup from "yup";

import "./app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../components/auth/BaseURL";

function AddPost() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [email, setemail] = useState();
  useEffect(() => {
    if (userData) {
      setemail(userData.email);
    }
  }, [userData]);
  const initialValues = {
    education: "",
    section: "",
    posttitle: "",
    description: "",
  };
  const onSubmit = async (values) => {
      const request = {
        author: email,
        title: values.posttitle,
        education: values.education,
        section: values.section,
        content: values.description,
      };
      await axios
        .post(`${BaseURL}addpost`, request)
        .then((res) => {
          if (res.data.message === "created") {
            navigate("/society");
          } else {
            navigate("/society/addpost");
          }
        });
  };
  const validationSchema = yup.object({
    description: yup.string().required("required"),
    education: yup.string().required("required"),
    section: yup.string().required("required"),
    posttitle: yup.string().required("required"),
  });

  return (
    <Card className="bg-img-society  text-white">
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          <Col xs={7}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <Card
                  className="d-flex justify-content-center"
                  style={{
                    backgroundColor: "transparent",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  <Card.Title
                    as="h3"
                    style={{ color: "#eee" }}
                    className="text-center mt-3 "
                  >
                    Create new Post
                  </Card.Title>
                  <Card.Body>
                    <FormGroup>
                      <FormLabel htmlFor="education" style={{ color: "white" }}>
                        Education
                      </FormLabel>
                      <Field
                        as="select"
                        name="education"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Choose your education
                        </option>
                        <option value="Bachelor's degree">
                          Bachelor's degree
                        </option>
                        <option value="Master's degree">Master's degree</option>
                        <option value="Doctorate degree">
                          Doctorate degree
                        </option>
                      </Field>
                      <span className="error-required">
                        <ErrorMessage name="education" />
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="section" style={{ color: "white" }}>
                        Section
                      </FormLabel>
                      <Field
                        as="select"
                        name="section"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Choose your section
                        </option>
                        <option value="Computer programming">
                          Computer programming
                        </option>
                        <option value="Computer network">
                          Computer network
                        </option>
                        <option value="Artificial intelligence">
                          Artificial intelligence
                        </option>
                        <option value="Data science">Data science</option>
                        <option value="Cyber security">Cyber security</option>
                      </Field>
                      <span className="error-required">
                        <ErrorMessage name="education" />
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="posttitle" style={{ color: "white" }}>
                        Post Title
                      </FormLabel>
                      <Field
                        type="text"
                        name="posttitle"
                        className="form-control"
                        placeholder="Enter a title for your post"
                      />
                      <span className="error-required">
                        <ErrorMessage name="posttitle" />
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel
                        htmlFor="description"
                        style={{ color: "white" }}
                      >
                        description
                      </FormLabel>
                      <Field
                        type="text"
                        name="description"
                        as="textarea"
                        maxLength={400}
                        rows="5"
                        className="form-control"
                        placeholder="Enter your description"
                      />
                      <span className="error-required">
                        <ErrorMessage name="description" />
                      </span>
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                      <Button type="submit">Add Post</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}

export default AddPost;
