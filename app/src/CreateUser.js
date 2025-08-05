import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const CreateUser = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({})

  const onChange = (e) =>{
    const nData = data
  
    nData[e.target.name] =  e.target.value
    setData(nData)
    console.log(data)
  }

  const createUser = async ()=>{
    try {
      await axios.post("http://localhost:4010/user/register", data)
      navigate("/")
    
    } catch (error) {
      console.log(error)
    }
  }


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
            <Form.Label style={{ fontWeight: "bold" }} >Nombre</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" name="name" onChange={onChange} />
          </Form.Group>

           <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }} >Apellido Paterno</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" name="ap" onChange={onChange} />
          </Form.Group>

           <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }} >Apellido Materno</Form.Label>
            <Form.Control type="text" placeholder="Ingresa tu nombre" name="am" onChange={onChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }} >Correo</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo electrónico" name="email" onChange={onChange}  />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "bold" }} name="password">Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" name="password" onChange={onChange}  />
          </Form.Group>

          <Button variant="success" className="w-100" style={{ fontWeight: "bold" }} onClick={()=>{createUser()}}>
            Crear cuenta
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
