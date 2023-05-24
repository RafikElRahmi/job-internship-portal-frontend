import React from "react";
import {
  CDBBox,
  CDBBtn,
  CDBIcon,
} from "cdbreact";
import logo from "../../images/logo.png";
import { ModalFooter } from "react-bootstrap";

const Footer = () => {
  return (
    <ModalFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
      >
        <CDBBox display="flex" alignItems="center">
          <img
            src={logo}
            width="120"
            height="30"
            className="d-inline-block"
            alt="Logo"
          />
        </CDBBox>
        <CDBBox>
          <small className="ms-2">
            &copy; FS Fast , 2023. All rights reserved.
          </small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn
            flat
            color="dark"
            className="mx-3 p-2"
            href="https://www.facebook.com/profile.php?id=100089005744665"
            style={{ textDecoration: "none" }}
          >
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn
            flat
            color="dark"
            className="mx-3 p-2"
            href="https://twitter.com/"
            style={{ textDecoration: "none" }}
          >
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn
            flat
            color="dark"
            className="mx-3 p-2"
            href="https://www.instagram.com/"
            style={{ textDecoration: "none" }}
          >
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </ModalFooter>
  );
};
export default Footer;
