import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import axios from "axios"
import { UpdateTextModal } from "./update"
import { useNavigate } from "react-router-dom";

export const TextsToUsers = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])


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



 

    return (
        <Container className="py-5">
          
                      <Row style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Col>
                    <h3 style={{ fontWeight: 'bold', color: '#0d6efd' }}>Tutor Inteligente</h3>
                </Col>
     
            </Row>
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

                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
  
          </Card>

          
        </Container>

    )
}