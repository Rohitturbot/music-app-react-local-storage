import React from "react";
import Playlist from "./components/PlaylistItems";
import PlaylistItem from "./components/PlaylistItem";
import Songs from "./components/Songs";
import usePageTitle from "./hooks/usePageTitle";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const App = () => {
  usePageTitle("Visual BI Music App");

  return (
    <Container>
      <BrowserRouter>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand href="/songs">Visual BI Music App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/songs">Songs</Nav.Link>
              <Nav.Link href="/playlist">Playlist</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route exact path="/playlist">
            <Playlist />
          </Route>
          <Route path="/playlist/:id">
            <PlaylistItem />
          </Route>
          <Route path="/">
            <Songs />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
