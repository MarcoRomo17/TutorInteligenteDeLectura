import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { PersonCircle, QuestionCircle, Book, PeopleFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState("");
    const [metrics, setMetrics] = useState({
            text: 0,
            users: 0
        })
    
       useEffect(() => {
           getMetrics()
           const storedRole = localStorage.userLogedRol
            setRole(storedRole);
        }, []);

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
    return (
        <Container style={{ padding: '20px' }}>
            <Row style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Col>
                    <h3 style={{ fontWeight: 'bold', color: '#0d6efd' }}>Tutor Inteligente</h3>
                </Col>
                <Col style={{ textAlign: 'right' }}>
                    <Link >
                        <Button variant="light" style={{ padding: '5px', borderRadius: '50%' }} onClick={()=>{localStorage.clear()}}>
                            <PersonCircle size={32} />
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row style={{ marginBottom: '20px' }}>
                <Col>
                    <InputGroup>
                        <Form.Control placeholder="Enter your question" />
                        <Button variant="primary">Ask</Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Col md={4} style={{ marginBottom: '15px' }}>
                    <Card style={{ height: '100%', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} onClick={()=>navigate("/Chat")}>
                        <Card.Body>
                            <QuestionCircle size={40} style={{ color: '#0d6efd', marginBottom: '10px' }} />
                            <Card.Title>Pregúntale a la IA</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} style={{ marginBottom: '15px' }}>
                    <Card style={{ height: '100%', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                        <Card.Body onClick={()=>navigate("/Tutors")}>
                            <PeopleFill size={40} style={{ color: '#0d6efd', marginBottom: '10px' }} />
                            <Card.Title>Tutors</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} style={{ marginBottom: '15px' }}>
                    <Card style={{ height: '100%', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}onClick={()=>navigate("/TextsToUsers")}>
                        <Card.Body>
                            <Book size={40} style={{ color: '#0d6efd', marginBottom: '10px' }} />
                            <Card.Title>Textos</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>















            <Row style={{ textAlign: 'center' }}>




                 {role === '"Teacher"' ? (
                <Col md={6} style={{ marginBottom: '15px' }}>

                    <Card style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} onClick={()=>navigate("/Catalogue")}>
                        <Card.Body>
                            <h5 style={{ marginBottom: '5px' }}>Lecturas registradas</h5>
                            <h3 style={{ color: 'green' }}>{metrics.text}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                    ) : (
                <Col md={6} style={{ marginBottom: '15px' }}>

                    <Card style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }} >
                        <Card.Body>
                            <h5 style={{ marginBottom: '5px' }}>Lecturas registradas</h5>
                            <h3 style={{ color: 'green' }}>{metrics.text}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                    )}







                {role === '"Teacher"' ? (
                                    <Col md={6} style={{ marginBottom: '15px' }}>
                    <Card style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}  onClick={()=>navigate("/Users")}>
                        <Card.Body>
                            <h5 style={{ marginBottom: '5px' }}>Usuarios registrados</h5>
                            <h3 style={{ color: 'green' }}>{metrics.users}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                    ) : (
                                    <Col md={6} style={{ marginBottom: '15px' }}>
                    <Card style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}  >
                        <Card.Body>
                            <h5 style={{ marginBottom: '5px' }}>Usuarios registrados</h5>
                            <h3 style={{ color: 'green' }}>{metrics.users}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                    )}


            </Row>
        </Container>
    );
};

export default Dashboard;
