import axios from "axios";
import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { BaseURL } from "../../components/auth/BaseURL";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const keys = searchInput.split(" ").filter((value) => value.trim() !== "");
    const request = { keys: keys };
    if (keys.length) {
        await axios.post(`${BaseURL}search`, request).then((res) => {
            const posts = res.data.posts || [];
            localStorage.setItem("userposts", JSON.stringify(posts));
        if (user && posts.length) {
          if (user.role === "admin") {
            navigate("/1KQ4vU4E9Fadmin/posts");
          } else if (user.role === "user") {
            navigate("/user/posts");
          } else if (user.role === "society") {
            navigate("/society/posts");
          }
        } 
      });
    }
  };
  return (
    <Form className="d-flex">
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button variant="outline-success" on onClick={handleSearch}>
        Search
      </Button>
    </Form>
  );
};

export default Search;
