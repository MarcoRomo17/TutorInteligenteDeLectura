import { useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";

export const CreateQuestion = () => {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestionCard = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleRegister = () => {
    console.log("Preguntas registradas:", questions);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h1 className="fw-bold text-primary">Registro de Preguntas</h1>
          <p className="text-muted">Agrega preguntas y respuestas para cada uno de los textos</p>
        </Col>
      </Row>

      {questions.map((q, index) => (
        <Card key={index} className="mb-4 shadow-sm border-0 rounded-4">
          <Card.Body>
            <Card.Title className="fs-5 fw-semibold text-secondary mb-4">
              Pregunta #{index + 1}
            </Card.Title>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Pregunta</Form.Label>
                <Form.Control
                  rows={2}
                  placeholder="Escribe la pregunta que se le mostrará al estudiante"
                  value={q.question}
                  onChange={(e) => handleChange(index, "question", e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold">Respuesta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Respuesta correcta esperada"
                  value={q.answer}
                  onChange={(e) => handleChange(index, "answer", e.target.value)}
                  className="rounded-3"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      ))}

      <Row className="justify-content-center">
        <Col md={8} className="d-flex justify-content-between">
          <Button variant="success" onClick={handleRegister} className="px-4 py-2 rounded-4 fw-bold">
            Registrar preguntas
          </Button>
          <Button variant="warning" onClick={addQuestionCard} className="px-4 py-2 rounded-4 fw-bold text-dark">
            + Otra pregunta
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
