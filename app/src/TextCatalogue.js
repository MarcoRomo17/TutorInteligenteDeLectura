import { useEffect, useState } from "react"
import { Button, Card, Container, Row, Col } from "react-bootstrap"
import axios from "axios"

export const Catalogue = () => {
    const [data, setData] = useState([])
    const [metrics, setMetrics] = useState({
        text: 0,
        users: 0
    })

   useEffect(() => {
       getMetrics()
        getText()
     
    }, []);

    const getText = async () =>{
        try {
            const texts = await axios.get("http://localhost:4010/text/getAll")
            setData(texts.data.allTexts)
        } catch (error) {
            console.log("error al obtener datos", error)
        }
    }

    const getMetrics = async () =>{
        try {
            const metricText = await axios.get("http://localhost:4010/text/count/all")
            const metricUser = await axios.get("http://localhost:4010/user/count/all")

               setMetrics({
                    text: metricText.data.allTexts,
                    users: metricUser.data.allUsers
                })
        } catch (error) {
            console.log("error al obtener datos", error)
        }
    }

    const update = async (id, updatedData) => {
        try {
            await axios.put("http://localhost:4010/text/update")
        } catch (error) {
            console.log("error al actualizar", error)
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

    return (
        <Container className="py-5">
  <h1 className="fw-bold text-primary mb-4">Catálogo</h1>

    <Card className="mb-4 shadow-sm rounded-4 p-3 bg-light">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5 className="fw-bold">Total de textos</h5>
              <p className="fs-4 text-primary">{metrics.text}</p>
            </Col>
            <Col md={6}>
              <h5 className="fw-bold">Total de usuarios</h5>
              <p className="fs-4 text-success">{metrics.users}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
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
                <Button variant="warning" className="rounded-3 px-3">Actualizar</Button>
                <Button variant="danger" className="rounded-3 px-3" onClick={() => deleteText(text._id)}>Borrar</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Card.Body>
  </Card>
</Container>

    )
}