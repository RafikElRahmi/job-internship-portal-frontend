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
import LoginAlert from "../home/LoginAlert";
import { useAuth } from "../../components/auth/Auth";
import { BaseURL } from "../../components/auth/BaseURL";

function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const initialValues = { email: "", password: "" };
  const onSubmit = async (values) => {
      const response = await axios.post(`${BaseURL}login`, values);
      switch (response.data.message) {
        case "login successfully":
          auth.login(response.data);
          if (response.data.role === 'admin') {
          navigate("/1KQ4vU4E9Fadmin");
          } else if (response.data.role === "user") {
          navigate("/user");
          } else {
          navigate("/society");
          }
          break;
        case "wrong password":
          setMessage("your password is wrong ,Please try again");
          break;
        case "wrong email":
          setMessage("your email is wrong ,Please try again");
          break;
        case "login fail":
          navigate("/register");
          break;
        default:
          throw new Error();
      }
  };
  let validationSchema = yup.object({
    email: yup.string().required("required").email("invalid email"),
    password: yup.string().required("required").min(8, "password too short "),
  });
  return (
    <>
      <Card className="bg-img text-white ">
        <Container className="mt-5">
          <Row className="d-flex justify-content-center">
            <Col xs={8}>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <Card
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
                      Login
                    </Card.Title>
                    <Card.Body>
                      <FormGroup>
                        <FormLabel htmlFor="email" style={{ color: "blue" }}>
                          Email
                        </FormLabel>
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
                        <FormLabel htmlFor="password" style={{ color: "blue" }}>
                          Password
                        </FormLabel>
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
                      <Button type="submit">Login</Button>
                    </Card.Body>
                  </Card>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Container>
      </Card>
      {message ? <LoginAlert message={message} /> : null}
    </>
  );
}

export default LoginForm;
