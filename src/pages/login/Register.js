import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import * as yup from "yup";
import "./app.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/Auth";
import LoginAlert from "../home/LoginAlert";
import { BaseURL } from "../../components/auth/BaseURL";

function RegisterForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    education: "",
    section: "",
    password: "",
    confirm_password: "",
  };
  const onSubmit = async (values) => {
    const response = await axios.post(`${BaseURL}register`, values);
    switch (response.data.message) {
      case "register successfully":
        auth.login({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          phone: response.data.phone,
          education: response.data.education,
          section: response.data.section,
          role: response.data.role,
          photo: response.data.photo,
        });
        navigate("/user");
        break;
      case "Email already exists":
        setMessage("the email you submit already exist");
        break;
      case "login fail":
        navigate("/register");
        break;
      default:
        throw new Error();
    }
  };
  const validationSchema = yup.object({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().required("required").email("invalid email"),
    phone: yup
      .number()
      .required("required")
      .positive("phone number must be positive")
      .integer("phone number must be an integer"),
    education: yup.string().required("required"),
    section: yup.string().required("required"),
    password: yup.string().required("required").min(8, "password too short"),
    confirm_password: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "passwords mismatch"),
  });

  return (
    <Card className="bg-img p-4">
      <Row className="d-flex justify-content-center">
        <Col xs={8}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Card
                className="bg-drop"
                style={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Card.Title
                  as="h3"
                  style={{ color: "blue" }}
                  className="text-center mt-3 "
                >
                  Register
                </Card.Title>
                <Card.Body>
                  <FormGroup>
                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                    <Field
                      type="text"
                      name="firstname"
                      className="form-control"
                      placeholder="Enter your firstname"
                    />
                    <span className="error-required">
                      <ErrorMessage name="firstname" />
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="lastname">Lastname</FormLabel>
                    <Field
                      type="text"
                      name="lastname"
                      className="form-control"
                      placeholder="Enter your lastname"
                    />
                    <span className="error-required">
                      <ErrorMessage name="lastname" />
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                    <span className="error-required">
                      <ErrorMessage name="email" />
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="phone">Phone number</FormLabel>
                    <Field
                      type="number"
                      name="phone"
                      className="form-control"
                      placeholder="Enter phone number"
                    />
                    <span className="error-required">
                      <ErrorMessage name="phone" />
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="education">Education</FormLabel>
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
                      <option value="Doctorate degree">Doctorate degree</option>
                    </Field>
                    <span className="error-required">
                      <ErrorMessage name="education" />
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="section">Section</FormLabel>
                    <Field as="select" name="section" className="form-control">
                      <option value="" disabled>
                        Choose your section
                      </option>
                      <option value="Computer programming">
                        Computer programming
                      </option>
                      <option value="Computer network">Computer network</option>
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                    <span className="error-required">
                      <ErrorMessage name="password" />
                    </span>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="confirm_password">
                      Confirm password
                    </FormLabel>
                    <Field
                      type="password"
                      name="confirm_password"
                      className="form-control"
                      placeholder="Confirm password"
                    />
                    <span className="error-required">
                      <ErrorMessage name="confirm_password" />
                    </span>
                  </FormGroup>
                  <Button type="submit">Register</Button>
                </Card.Body>
              </Card>
            </Form>
          </Formik>
        </Col>
      </Row>
      {message ? <LoginAlert message={message} /> : null}
    </Card>
  );
}

export default RegisterForm;
