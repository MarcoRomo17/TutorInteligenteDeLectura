import { Container, Row, Col } from "react-bootstrap";

export const Home = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="fw-bold text-primary mb-3">
            Bienvenido al Tutor Inteligente de Lectura
          </h1>
          <p className="fs-5 text-muted">
            Una plataforma educativa que adapta textos a tu nivel de comprensión lectora.
            Aprende, mejora y explora nuevas lecturas personalizadas para ti 📖✨
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5487/5487030.png"
            alt="Lectura"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};
