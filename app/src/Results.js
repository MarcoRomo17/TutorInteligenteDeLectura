import { Container, Card, ProgressBar, Button } from "react-bootstrap";

export const Results = () => {
  const userName = "Maria Lopez";
  const score = 8;
  const totalQuestions = 10;
  const percentage = (score / totalQuestions) * 100;
  const successMessage =
    percentage >= 80
      ? "Excelente"
      : percentage >= 50
      ? "Buen trabajo"
      : "Date de baja";

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card style={{ maxWidth: "450px", width: "100%", padding: "2rem" }}>
        <h3 className="text-center mb-4" style={{ fontFamily: "Georgia, serif", color: "#4b2e83" }}>
          Resultados del Test
        </h3>
        <p>
          <strong>Nombre:</strong> {userName}
        </p>
        <p>
          <strong>Puntaje:</strong> {score} de {totalQuestions}
        </p>

        <ProgressBar
          now={percentage}
          label={`${percentage.toFixed(0)}%`}
          variant={percentage >= 80 ? "success" : percentage >= 50 ? "warning" : "danger"}
          className="mb-4"
          animated
          striped
        />

        <p style={{ fontStyle: "italic", color: "#555" }}>{successMessage}</p>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="primary">Reintentar Test de Lectura</Button>
          <Button variant="outline-secondary">Seguir Leyendo</Button>
        </div>
      </Card>
    </Container>
  );
};
