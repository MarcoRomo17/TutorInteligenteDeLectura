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
} from "react-bootstrap";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    ap: "",
    am: "",
    email: "",
    password: "",
    rol: "",
  });

  const BASE_URL = "http://localhost:4010";

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getAll`);
      setUsers(res.data.allUsers);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userID) => {
    try {
      await axios.delete(`${BASE_URL}/user/delete`, {
        data: { userID },
      });
      fetchUsers(); // recargar lista
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Abrir modal para actualizar usuario
  const openModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      ap: user.ap || "",
      am: user.am || "",
      email: user.email || "",
      password: "", // por seguridad no se muestra
      rol: user.rol || "",
    });
    setShowModal(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Enviar actualización
  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/user/update`, {
        userID: selectedUser._id,
        ...formData,
      });
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  // Manejar cambios del formulario
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Lista de usuarios</Card.Title>
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
                  <div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(user._id)}
                      className="me-2"
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openModal(user)}
                    >
                      Actualizar
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      {/* Modal para actualizar usuario */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Apellido paterno</Form.Label>
              <Form.Control
                type="text"
                name="ap"
                value={formData.ap}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Apellido materno</Form.Label>
              <Form.Control
                type="text"
                name="am"
                value={formData.am}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Contraseña (dejar en blanco si no se cambia)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="">Selecciona un rol</option>
                <option value="student">Estudiante</option>
                <option value="Teacher">Docente</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
