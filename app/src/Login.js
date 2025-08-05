import axios from "axios";
import { useState } from "react";
import { Button, Card, Container, Form, Alert, Row, Col } from "react-bootstrap";
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
      const consulta =await axios.post("http://localhost:4010/user/sign", data)
      const usuario= consulta.data.userLoged[0]
      console.log(usuario)
      localStorage.userLoged=JSON.stringify(usuario.name)
      localStorage.userLogedRol=JSON.stringify(usuario.rol)
      console.log(localStorage.userLogedRol)
      console.log(localStorage.userLoged)   
      if(!usuario){
        
        alert("Usuario no encontrado :(");
      }else{
        alert("¡Inicio de sesión exitoso!");
        navigate("/Dashboard")
      }
    
    } catch (error) {
      console.log(error)
    }


  };



  return (
    <Container className="py-5">

                  <Row style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Col>
                    <h3 style={{ fontWeight: 'bold', color: '#0d6efd' }}>Tutor Inteligente</h3>
                </Col>
                <Col style={{ textAlign: 'right' }}>
    
                </Col>
            </Row>
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

                            <Button
                variant="info"
                className="fw-bold px-4 py-2 rounded-4"
                onClick={()=>navigate("/CreateUser")}
              >
                Registrarse
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
