import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./app.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { BaseURL } from "../../components/auth/BaseURL";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const AdminPosts = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState(
    JSON.parse(localStorage.getItem("userposts"))
  );
  const [education, seteducation] = useState();
  const [section, setsection] = useState();

  const categories = JSON.parse(localStorage.getItem("categories"));
  useEffect(() => {
    if (categories) {
      seteducation(categories.education);
      setsection(categories.section);
    }
  }, []);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(10);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  // Calculate indexes of the first and last posts on the current page
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Slice the array of posts to only include those on the current page
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages based on the number of posts and posts per page
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Generate an array of page numbers based on total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const initialValues = {
    education: education || "all",
    section: section || "all",
  };
  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      const request = {
        email: user.email,
        education: values.education,
        section: values.section,
      };
      await axios.post(`${BaseURL}filterposts`, request).then((res) => {
        const posts = [...res.data.posts].reverse();
        localStorage.setItem("userposts", JSON.stringify(posts));
        setposts(posts)
        seteducation(null);
        setsection(null);
        localStorage.removeItem("categories");
      });
    } else {
      navigate("/login");
    }
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
        let newposts = JSON.parse(localStorage.getItem("userposts"));
        let index = 0;
        newposts.map((post) => {
          if (post.id == id) {
            newposts.splice(index, 1);
          }
          index++;
        });
        localStorage.setItem("userposts", JSON.stringify(newposts));
        setposts(newposts);
        setShowConfirmation(false);
      }
    });
  };
  const handleprofile = async (email, author) => {
    const request = { email: email };
    const name = author.replace(/\s/g, "");
    await axios.post(`${BaseURL}postprofile`, request).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("profile", JSON.stringify(res.data));
        navigate(`/1KQ4vU4E9Fadmin/profile/${name}`);
      } else {
        navigate("/1KQ4vU4E9Fadmin/posts/usernotfound");
      }
    });
  };
  return (
    <Card className="bg-posts p-5">
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
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Card className="p-3 mx-3 mb-3 drop text-white">
          <Form>
            <Row>
              <Col xs={5} className="px-3 ">
                <FormGroup as={Row}>
                  <FormLabel column sm="3" htmlFor="education">
                    Education
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      className="form-control"
                      as="select"
                      name="education"
                      value={education}
                      onClick={() => seteducation(null)}
                    >
                      <option value="all">All education</option>
                      <option value="Bachelor's degree">
                        Bachelor's degree
                      </option>
                      <option value="Master's degree">Master's degree</option>
                      <option value="Doctorate degree">Doctorate degree</option>
                    </Field>
                  </Col>
                </FormGroup>
              </Col>
              <Col xs={5} className="px-3">
                <FormGroup as={Row}>
                  <FormLabel column sm="3" htmlFor="section">
                    Sections
                  </FormLabel>
                  <Col sm="9">
                    <Field
                      className="form-control"
                      as="select"
                      name="section"
                      value={section}
                      onClick={() => setsection(null)}
                    >
                      <option value="all">All sections</option>
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
                  </Col>
                </FormGroup>
              </Col>
              <Col xs={2} className="px-3">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="text-center px-3 justify-items-end"
                    type="submit"
                  >
                    filter
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      </Formik>
      {currentPosts.length ? (
        currentPosts.map((post) => {
          return (
            <Card key={post.id} className="m-3 p-3">
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
                <Button
                  variant="danger"
                  className="form-control"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
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
            We apologies , No posts found yet !
          </Card.Title>
        </Card>
      )}
      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"page-item disabled"}
          breakLinkClassName={"page-link"}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
          forcePage={currentPage}
        />
      )}
    </Card>
  );
};
export default AdminPosts;
