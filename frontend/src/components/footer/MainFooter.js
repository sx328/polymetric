import { Container, Row, Col } from "react-bootstrap";

export default function MainFooter() {
    return (
        <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
        <Container fluid>
          <Row>
          <Col>
          <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
          </Col>
          <Col>
            <span className="copyright ml-auto my-auto mr-2">2023 - Polymetric</span>
            </Col>
          </Row>
        </Container>
      </footer>
    );
}