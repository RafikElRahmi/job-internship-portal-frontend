import React, { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Card,
  Col,
  Container,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import * as yup from "yup";

import "./app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../components/auth/BaseURL";

function ModifyPost() {
  const navigate = useNavigate();
  const post = JSON.parse(localStorage.getItem("postmodify"));
  const [education, seteducation] = useState(post.education);
  const [section, setsection] = useState(post.section);
  const [posttitle, setposttitle] = useState(post.title);
  const [description, setdescription] = useState(post.content);
  const initialValues = {
    education: education || "",
    section: section || "",
    posttitle: posttitle || "",
    description: description || "",
  };
    const onSubmit = async (values) => {
    const request = {
      id: post.id,
      title: values.posttitle,
      education: values.education,
      section: values.section,
      content: values.description,
    };
    await axios.post(`${BaseURL}modifypost`, request).then((res) => {
      if (res.data.status === 200) {
        const myposts = [...res.data.myposts].reverse();
        localStorage.setItem('myposts', JSON.stringify(myposts))
        localStorage.removeItem("postmodify");
        navigate("/society/myposts");
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
                    Modify Post
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
                        onFocus={() => seteducation()}
                        value={education}
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
                        value={section}
                        onClick={() => setsection()}
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
                        onFocus={() => setposttitle()}
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
                        value={description}
                        onFocus={() => setdescription()}
                        rows="5"
                        className="form-control"
                        placeholder="Enter your description"
                      />
                      <span className="error-required">
                        <ErrorMessage name="description" />
                      </span>
                    </FormGroup>
                    <div className="d-flex justify-content-end">
                      <Button type="submit">Save changes</Button>
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

export default ModifyPost;
