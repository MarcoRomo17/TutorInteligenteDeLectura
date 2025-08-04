import axios from "axios";
import React, { useState } from "react";
import {
   Card,
   Container,
   Form,
   Button,
   ListGroup,
   Spinner,
} from "react-bootstrap";

const Chat = () => {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSend = async () => {
      if (!input.trim()) return;

      const userMessage = { sender: "Tú", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setLoading(true);

      try {
         const response = await axios.post("http://localhost:5000/ia/chat", {
            message: input,
         });

         const botMessage = { sender: "Tutor", text: response.data.msg };
         setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
         setMessages((prev) => [
            ...prev,
            { sender: "Tutor", text: "Hubo un error al procesar tu mensaje." },
         ]);
      }

      setLoading(false);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         handleSend();
      }
   };

   return (
      <div>
         <Container className="mt-3">
            <Card>
               <Card.Body>
                  <Card.Title style={{ fontWeight: "bold", color: "#0d6efd" }}>
                     Tutor Inteligente de Lectura
                  </Card.Title>
                  <p>
                     Esta inteligencia artificial está diseñada para ayudarte a
                     descubrir nuevos libros según tus gustos. Puedes pedirle
                     recomendaciones de géneros como fantasía, terror o poesía,
                     y te sugerirá lecturas que podrían interesarte. La idea es
                     que puedas ir ampliando tu catálogo personal y disfrutar
                     aún más del hábito de leer.
                  </p>
                  <ListGroup
                     className="mt-3 mb-3"
                     style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                     {messages.map((msg, index) => (
                        <ListGroup.Item
                           key={index}
                           variant={msg.sender === "Tú" ? "secondary" : "light"}
                        >
                           {/* Esto es lo que se muestra en pantalla. */}
                           <strong>{msg.sender}:</strong> {msg.text}
                        </ListGroup.Item>
                     ))}
                     {loading && (
                        <ListGroup.Item>
                           <Spinner animation="border" size="sm" /> Pensando...
                        </ListGroup.Item>
                     )}
                  </ListGroup>

                  <Form>
                     <Form.Group className="d-flex">
                        <Form.Control
                           type="text"
                           placeholder="Escribe tu mensaje..."
                           value={input}
                           onChange={(e) => setInput(e.target.value)}
                           onKeyDown={handleKeyDown}
                        />
                        <Button onClick={handleSend} className="ms-2">
                           Enviar
                        </Button>
                     </Form.Group>
                  </Form>
               </Card.Body>
            </Card>
         </Container>
      </div>
   );
};

export default Chat;
