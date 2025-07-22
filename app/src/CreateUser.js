import { Button, Card, Container, Form } from "react-bootstrap";

export const CreateUser = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card style={{ width: "100%", maxWidth: "450px", padding: "2rem", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <h3 className="text-center mb-4" style={{ fontFamily: "Georgia, serif", color: "#4b2e83" }}>
          Crea tu cuenta
        </h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem" }}>
          Únete a nuestra comunidad lectora
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>Correo</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "bold" }}>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100" style={{ fontWeight: "bold" }}>
            Crear cuenta
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
