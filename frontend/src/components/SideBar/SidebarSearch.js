import React from "react";
import {
  Form,
  InputGroup,
  Button
} from "react-bootstrap";

export default () => (
  <Form className="main-sidebar__search w-100 border-right d-sm-flex" style={{ display: "flex", minHeight: "45px" }}>
    <InputGroup seamless className="ml-3">
    <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Add
        </Button>
    </InputGroup>
  </Form>
);
