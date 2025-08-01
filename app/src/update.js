import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export const UpdateTextModal = ({ show, onHide, textToEdit, onUpdate }) => {
  const [textData, setTextData] = useState({
    title: "",
    estimatedLevel: "",
    content: "",
    id: ""
  });

  useEffect(() => {
    if (textToEdit) {
      setTextData({
        title: textToEdit.title,
        estimatedLevel: textToEdit.estimatedLevel,
        content: textToEdit.content,
        id: textToEdit._id
      });
    }
  }, [textToEdit]);

  const handleChange = (field, value) => {
    setTextData({ ...textData, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4010/text/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(textData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Texto actualizado correctamente ");
        onUpdate(result);
        onHide();
      } else {
        alert("Error al actualizar el texto");
        console.error("Error:", await response.text());
      }
    } catch (error) {
      alert("Error de conexión con el servidor 🔌");
      console.error("Fetch error:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Texto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Título del texto</Form.Label>
            <Form.Control
              type="text"
              value={textData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Nivel estimado</Form.Label>
            <Form.Control
              type="text"
              value={textData.estimatedLevel}
              onChange={(e) => handleChange("estimatedLevel", e.target.value)}
              className="rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Contenido del texto</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={textData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="rounded-3"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
