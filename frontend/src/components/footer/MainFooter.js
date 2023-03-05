import { Container, Row, Nav } from "react-bootstrap";

export default function MainFooter() {
    return (
        <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
        <Container fluid>
          <Row>
            <Nav>
            </Nav>
            <span className="copyright ml-auto my-auto mr-2">2023 - Polymetric</span>
          </Row>
        </Container>
      </footer>
    );
}