import React from "react";
import UpdateProfile from "../components/UpdateProfile";
import { Container } from "react-bootstrap";

export default function UpdateProfilePage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <UpdateProfile />
      </div>
    </Container>
  );
}
