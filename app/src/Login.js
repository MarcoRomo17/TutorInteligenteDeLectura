import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    if (correo.trim() === "" || password.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
     const data = {
      email: correo,
      password: password
    }
    try {
      await axios.post("http://localhost:4010/user/sign", data)
      alert("¡Inicio de sesión exitoso!");
      navigate("/registerText")
    
    } catch (error) {
      console.log(error)
    }


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
