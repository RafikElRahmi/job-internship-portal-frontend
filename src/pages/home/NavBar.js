import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import "./app.css";
import { BaseURL } from "../../components/auth/BaseURL";
import axios from "axios";
import { useAuth } from "../../components/auth/Auth";

function NavBar() {
  const auth = useAuth();
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState();
  const [user, setuser] = useState();
  const [email, setemail] = useState();
  const storedData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (storedData) {
      if (storedData.role === "admin") {
        setuser("admin");
        setemail(storedData.email);
      } else if (storedData.role === "user") {
        setuser("user");
        setemail(storedData.email);
      } else if (storedData.role === "society") {
        setuser("society");
        setemail(storedData.email);
      }
    } else {
      setuser("");
      setemail('');
    }
  }, [storedData]);
  useEffect(() => {
    if (storedData) {
      setPhoto(storedData.photo);
      if (localStorage.getItem("photo")) {
        setProfile(localStorage.getItem("photo"));
      }
    } else {
      setPhoto(null);
      setProfile(null);
    }
  }, [storedData, photo]);
  const navigate = useNavigate();
  useEffect(() => {
    if (photo) {
      const request = { path: photo };
      axios.post(`${BaseURL}getphoto`, request).then((response) => {
        setProfile(response.data);
        localStorage.setItem("photo", response.data);
      });
    }
  }, [photo]);
  const logout = () => {
    auth.logout();
    navigate("/");
  };
  const handleAuth = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      if (data.role === "admin") {
        navigate("/1KQ4vU4E9Fadmin");
      } else if (data.role === "user") {
        navigate("/user");
      } else if (data.role === "society") {
        navigate("/society");
      }
    } else {
      navigate("/");
    }
  };
  const handleupgrade = async () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      const email = { email: data.email };
      await axios.post(`${BaseURL}checkupgrade`, email).then((res) => {
        if (res.data.message === "no postulation") {
          navigate("/user/upgrade");
        } else if (res.data.message === "postulation found") {
          localStorage.setItem("postulationsociety", JSON.stringify(res.data));
          navigate("/user/postulationupgrade");
        } else if (res.data.message === "user not found") {
          navigate("/login");
        }
      });
    } else {
      navigate("/");
    }
  };
  const handelposts = async () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      const email = { email: data.email };
      await axios.post(`${BaseURL}postsuser`, email).then((res) => {
        const posts = [...res.data.posts].reverse();
        localStorage.setItem("userposts", JSON.stringify(posts));
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
  const handlemyposts = async () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      const email = { email: data.email };
      await axios.post(`${BaseURL}myposts`, email).then((res) => {
        if (res.data.message === "succes") {
          const posts = [...res.data.posts].reverse();
          localStorage.setItem("myposts", JSON.stringify(posts));
          navigate("/society/myposts");
        } else if (res.data.message === "user not found") {
          navigate("/login");
        }
      });
    } else {
      navigate("/");
    }
  };
  const handleprofile = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      if (data.role === "admin") {
        navigate("/1KQ4vU4E9Fadmin/profile");
      } else if (data.role === "user") {
        navigate("/user/profile");
      } else if (data.role === "society") {
        navigate("/society/profile");
      }
    } else {
      navigate("/");
    }
  };
  const handlepostulations = async () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const email = { email: data.email };
    await axios.post(`${BaseURL}userpostulations`, email).then((res) => {
      const postulations = [...res.data.postulations].reverse();

      localStorage.setItem("postulations", JSON.stringify(postulations));
      navigate("/user/postulations");
    });
  };
  const handleSocietyPostulations = async () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const email = { email: data.email };
    await axios.post(`${BaseURL}societypostulations`, email).then((res) => {
      const postulations = [...res.data.postulation].reverse();
      localStorage.setItem("societypostulations", JSON.stringify(postulations));
      navigate("/society/postulations");
    });
  };
  const handleadminusers = async() => {
    await axios.post(`${BaseURL}getusers`).then((res) => {
      const users = [...res.data.users];
      localStorage.setItem("userslist", JSON.stringify(users));
      navigate("/1KQ4vU4E9Fadmin/users");
    });

  };
  const handleadminsocieties = async () => {
    await axios.post(`${BaseURL}getsocieties`).then((res) => {
      const users = [...res.data.users];
      localStorage.setItem("userslist", JSON.stringify(users));
      navigate("/1KQ4vU4E9Fadmin/societies");
    });
  };
  const handleadmins = async () => {
    await axios.post(`${BaseURL}getadmins`).then((res) => {
      const users = [...res.data.users];
      localStorage.setItem("userslist", JSON.stringify(users));
      navigate("/1KQ4vU4E9Fadmin/admins");
    });
  };
  const handleadminpostulations = async () => {
    await axios.post(`${BaseURL}getadminpostulations`).then((res) => {
      const postulations = [...res.data.postulations];
      localStorage.setItem("postulations", JSON.stringify(postulations));
      navigate("/1KQ4vU4E9Fadmin/postulations");
    }); 
  };
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand onClick={handleAuth}>
        <img
          src={logo}
          width="120"
          height="30"
          className="d-inline-block align-top mx-3"
          alt="Logo"
        />
      </Navbar.Brand>
      {profile ? (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="pills" className="mr-auto">
            <Nav.Link
              onClick={handleAuth}
              className="px-2 mx-2 btn-outline-success text-white"
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={handelposts}
              className="px-2 mx-2 btn-outline-success text-white"
            >
              Posts
            </Nav.Link>
            {user === "user" ? (
              <Nav.Link
                onClick={handlepostulations}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                My postulations
              </Nav.Link>
            ) : null}
            {user === "user" ? (
              <Nav.Link
                onClick={handleupgrade}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                Upgrade
              </Nav.Link>
            ) : null}
            {user === "society" ? (
              <Nav.Link
                onClick={handlemyposts}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                My posts
              </Nav.Link>
            ) : null}
            {user === "society" ? (
              <Nav.Link
                onClick={() => navigate("/society/addpost")}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                Add post
              </Nav.Link>
            ) : null}
            {user === "society" ? (
              <Nav.Link
                className="px-2 mx-2 btn-outline-success text-white"
                onClick={handleSocietyPostulations}
              >
                Postulations
              </Nav.Link>
            ) : null}
            {user === "admin" ? (
              <Nav.Link
                onClick={handleadminusers}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                Users
              </Nav.Link>
            ) : null}
            {user === "admin" ? (
              <Nav.Link
                onClick={handleadminsocieties}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                Societies
              </Nav.Link>
            ) : null}
            {email === "superadmin@gmail.com" ? (
              <Nav.Link
                onClick={handleadmins}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                Admins
              </Nav.Link>
            ) : null}
            {user === "admin" ? (
              <Nav.Link
                onClick={handleadminpostulations}
                className="px-2 mx-2 btn-outline-success text-white"
              >
                Postulations
              </Nav.Link>
            ) : null}
            <Nav.Link
              onClick={() => navigate("/about")}
              className="px-2 mx-2 btn-outline-success text-white"
            >
              About
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <NavDropdown
            title={
              <img
                src={`data:image/png;base64,${profile}`}
                width="40"
                height="40"
                className="rounded-circle ml-3 mr-4"
                alt="Profile"
              />
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={handleprofile}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      ) : (
        <Form className="d-flex ml-auto">
          <Button
            className="mx-3 px-5"
            variant="outline-success"
            onClick={() => navigate("/login")}
          >
            login
          </Button>
          <Button
            className="mx-3 px-5"
            variant="outline-success"
            onClick={() => navigate("/register")}
          >
            register
          </Button>
        </Form>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}

export default NavBar;
