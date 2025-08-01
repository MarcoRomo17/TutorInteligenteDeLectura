import { useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CreateText = () => {
  const navigate = useNavigate()
  const [textData, setTextData] = useState({
    title: "",
    estimatedLevel: "",
    content: "",
  });

  const handleChange = (field, value) => {
    setTextData({ ...textData, [field]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:4010/text/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(textData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Texto registrado con éxito:", result);
        alert("Texto registrado correctamente ");
        navigate("/Catalogue")
      } else {
        alert("Hubo un error al registrar el texto ");
        console.error("Error:", await response.text());
      }
    } catch (error) {
      alert("Error de conexión con el servidor 🔌");
      console.error("Fetch error:", error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h1 className="fw-bold text-primary">Registro de Textos</h1>
          <p className="text-muted">
            Sube textos para evaluar la comprensión lectora de tus estudiantes
          </p>
        </Col>
      </Row>

      <Card className="mb-4 shadow-sm border-0 rounded-4">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Título del texto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. 'El viaje de una gota de agua'"
                value={textData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nivel estimado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej. Facil, Medio, Dificil"
                value={textData.category}
                onChange={(e) => handleChange("estimatedLevel", e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Contenido del texto</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Pega aquí el contenido completo del texto"
                value={textData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="rounded-3"
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Row className="justify-content-center">
        <Col md={8} className="d-flex justify-content-end">
          <Button
            variant="success"
            onClick={handleRegister}
            className="px-4 py-2 rounded-4 fw-bold"
          >
            Registrar texto
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
