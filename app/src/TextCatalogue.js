import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import axios from "axios"
import { UpdateTextModal } from "./update"
import { useNavigate } from "react-router-dom";

export const Catalogue = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [selectedText, setSelectedText] = useState(null);
    const [showModal, setShowModal] = useState(false);

   useEffect(() => {
        getText()
     
    }, []);

    const getText = async () =>{
        try {
            const texts = await axios.get("http://localhost:4010/text/bringAll")
            setData(texts.data.allTexts)
        } catch (error) {
            console.log("error al obtener datos", error)
        }
    }

    const deleteText = async (id) => {
        try {
            await axios.delete("http://localhost:4010/text/delete", {data: { id: id }})
            getText()
        } catch (error) {
            console.log("error al borrar", error)
        }
    }

    const handleEditClick = (text) => {
      setSelectedText(text);
      setShowModal(true);
    };

    const handleUpdate = (updatedText) => {
      console.log("Texto actualizado:", updatedText);
      getText()
    };

    return (
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold text-primary">Catálogo</h1>
            <Button variant="success" className="rounded-3 px-4 fw-bold"onClick={() => navigate("/registerText")}>Nuevo texto</Button>
          </div>  
          <Card className="shadow-sm rounded-4 p-3">
            <Card.Body>
              {data.length === 0 ? (
                <p className="text-muted">No hay elementos en el catálogo.</p>
              ) : (
                data.map((text, i) => (
                  <Card key={i} className="mb-3 shadow-sm rounded-4">
                    <Card.Body>
                      <h5 className="fw-bold">Título: {text.title}</h5>
                      <p><strong>Contenido:</strong> {text.content}</p>
                      <p><strong>Nivel estimado:</strong> {text.estimatedLevel}</p>

                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="warning" className="rounded-3 px-3"  onClick={() => handleEditClick({ _id: text._id, title: text.title, estimatedLevel: text.estimatedLevel, content: text.content})}>Actualizar</Button>
                        <Button variant="danger" className="rounded-3 px-3" onClick={() => deleteText(text._id)}>Borrar</Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
            <UpdateTextModal
                show={showModal}
                onHide={() => setShowModal(false)}
                textToEdit={selectedText}
                onUpdate={handleUpdate}
              />
          </Card>

          
        </Container>

    )
}