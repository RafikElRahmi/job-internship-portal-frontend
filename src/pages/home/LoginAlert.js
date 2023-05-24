import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginAlert = ({ message }) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setShow(true);
  }, []);
  const handleClose = () => {
    setShow(false);
    navigate("/login");
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title as="h2">ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginAlert;
