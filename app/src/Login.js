import { useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";

export const Login = () => {
  // Usuario hardcodeado
  const usuarioValido = {
    correo: "user@gmail.com",
    password: "12345",
  };

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (correo.trim() === "" || password.trim() === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Si es que el email y password no son correctos
    if (correo !== usuarioValido.correo || password !== usuarioValido.password) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    // Si es que el email y password son correctos
    setError("");
    alert("¡Inicio de sesión exitoso!");
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold text-primary mb-4">Iniciar sesión</h1>

      <Card className="shadow-sm rounded-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="rounded-3">
                {error}
              </Alert>
            )}

            <div className="text-center mt-3">
              <Button
                variant="info"
                className="fw-bold px-4 py-2 rounded-4"
                onClick={handleLogin}
              >
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
