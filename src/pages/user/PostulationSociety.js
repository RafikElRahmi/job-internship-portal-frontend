import React from "react";
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

function PostulationSociety() {
  const navigate = useNavigate();
  const initialValues = { adress: "", fax: "" };
  const data = JSON.parse(localStorage.getItem("userData"));
  
  const onSubmit = async (values) => {
    let email = null
    if (data) {
       email = data.email;
    } else {
       email = null;
    }
    const request = { email: email, adress: values.adress, fax: values.fax }
    axios
      .post(`${BaseURL}upgradesociety`, request)
      .then(() => navigate("/user"));
  };
  let validationSchema = yup.object({
    adress: yup.string().required("required").min(5, "invalid adress "),
    fax: yup.string().required("required").min(8, "password too short "),
  });
  return (
    <Card className="bg-society text-white ">
      <Container className="mt-5">
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="text-white">
                <Card
                  className="drop"
                >
                  <Card.Title
                    as="h3"
                    className="text-center mt-3 "
                  >
                    Upgrade to society
                  </Card.Title>
                  <Card.Body>
                    <FormGroup>
                      <FormLabel htmlFor="email" >
                        Adress
                      </FormLabel>
                      <Field
                        type="text"
                        name="adress"
                        className="form-control"
                        placeholder="Enter your adress"
                      />
                      <span className="error-required">
                        <ErrorMessage name="adress" />
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor="fax" >
                        fax
                      </FormLabel>
                      <Field
                        type="text"
                        name="fax"
                        className="form-control"
                        placeholder="Enter fax"
                      />
                      <span className="error-required">
                        <ErrorMessage name="fax" />
                      </span>
                    </FormGroup>
                    <Button type="submit">send</Button>
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

export default PostulationSociety;
