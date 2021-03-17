import React from "react";
import { Container } from "react-bootstrap";
import "../src/index.scss";

export const decorators = [
  (Story) => (
    <Container>
      <Story />
    </Container>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
