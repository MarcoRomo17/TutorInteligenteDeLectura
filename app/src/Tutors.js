import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  ListGroup,
  Spinner,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export const Tutors = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  const BASE_URL = "http://localhost:4010";

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getAll`);
      const usersUnfiltered=res.data.allUsers
      const tutors = usersUnfiltered.filter((user) => user.rol == "Teacher");
      setUsers(tutors);

    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
                            <Row style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Col>
                    <h3 style={{ fontWeight: 'bold', color: '#0d6efd' }}>Tutor Inteligente</h3>
                </Col>
     
            </Row>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Lista de tutores</Card.Title>
          {loading ? (
            <Spinner animation="border" />
          ) : users.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <ListGroup>
              {users.map((user) => (
                <ListGroup.Item
                  key={user._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>
                      {user.name} {user.ap} {user.am}
                    </strong>{" "}
                    - {user.email} ({user.rol})
                  </div>

                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

    </Container>
  );
};
