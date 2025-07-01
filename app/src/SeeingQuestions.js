import { Button, Card, Container, ListGroup } from "react-bootstrap";

export const SeeingQuestions = () => {
  const textos = [
    {
      title: "Texto #1",
      questions: [
        "¿Cual es el titulo del texto?",
        "¿Cual es la trama?",
        "¿Quién es el personaje principal?"
      ],
    },
    {
      title: "Texto #2",
      questions: [
        "¿Cual es el titulo del texto?",
        "¿Cual es la trama?",
        "¿Quién es el personaje principal?"
      ],
    },
    {
      title: "Texto #3",
      questions: [
        "¿Cual es el titulo del texto?",
        "¿Cual es la trama?",
        "¿Quién es el personaje principal?"
      ],
    },
    {
      title: "Texto #4",
      questions: [
        "¿Cual es el titulo del texto?",
        "¿Cual es la trama?",
        "¿Quién es el personaje principal?"
      ],
    },
    {
      title: "Texto #5",
      questions: [
        "¿Cual es el titulo del texto?",
        "¿Cual es la trama?",
        "¿Quién es el personaje principal?"
      ],
    },
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center text-primary mb-4 fw-bold">Preguntas por texto</h2>

      {textos.map((texto, index) => (
        <Card key={index} className="mb-4 shadow-sm border-0 rounded-4">
          <Card.Body>
            <Card.Title className="text-secondary fs-4 mb-3">{texto.title}</Card.Title>
            <ListGroup variant="flush">
              {texto.questions.map((pregunta, i) => (
                <ListGroup.Item key={i} className="py-2">
                  {pregunta}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          
        </Card>
      ))}
      <Button variant="warning">Enviar mis respuestas</Button>
    </Container>
  );
};
