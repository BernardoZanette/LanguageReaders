import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function MeusCards() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [langToLearn, setLang] = useState('en'); // Default language

    const fetchCards = () => {
        fetch('http://127.0.0.1:8000/api/cards/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar os cartões');
                }
                return response.json();
            })
            .then(data => {
                setCards(data); // Atualiza o estado com os cartões
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    };


    const deleteCard = (id) => {
        fetch(`http://127.0.0.1:8000/api/cards/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar o cartão');
            }
            return response.json();
        })
        .then(data => {
            console.log('Cartão deletado com sucesso:', data);
            fetchCards();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };

    const languages = {
        en: "English",
        ru: "Русский",
        es: "Español",
        fr: "Français",
        de: "Deutsch",
        la: "Latín",
        it: "Italiano",
        zh: "官话"
    };

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/cards?lang=${langToLearn}`)
            .then(response => response.json())
            .then(json => {
                setCards(json);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [langToLearn]);

    return (
        <div className="p-3">
            <Container>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="languageSelect">
                            <Form.Label>Select Language</Form.Label>
                            <Form.Control
                                as="select"
                                value={langToLearn}
                                onChange={(e) => setLang(e.target.value)}
                            >
                                {Object.keys(languages).map((key) => (
                                    <option key={key} value={key}>
                                        {languages[key]}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Link to="/" style={{ textDecoration: 'none', marginRight: '20px' }}>
                            <Button
                                variant="primary"
                                className="d-flex align-items-center gap-2"
                                style={{ borderRadius: '50px', padding: '10px 20px' }}
                            >
                                <span>Voltar</span>
                            </Button>
                        </Link>
                        <Link to={`/jogo?lang=${langToLearn}`} style={{ textDecoration: 'none' }}>
                            <Button
                                variant="primary"
                                className="d-flex align-items-center gap-2"
                                style={{ borderRadius: '50px', padding: '10px 20px' }}
                            >
                                <span>Jogar</span>
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="my-4">
                    {loading ? (
                        <Col className="d-flex justify-content-center">
                            <Spinner animation="border" variant="primary" />
                            <span className="ms-2">Buscando seus cards...</span>
                        </Col>
                    ) : (
                        cards && cards.map((card, index) => (
                            card.lang == langToLearn ? (
                                <Col md={4} lg={3} key={index} className="mb-4">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Title>{card.word}</Card.Title>
            
                                            <Card.Body>
                                                <strong>Translation:</strong> {card.translation}
                                            </Card.Body>
                                            <Card.Body>
                                                <strong>Language:</strong> {languages[card.lang] || card.lang}
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Footer className="d-flex justify-content-end">
                                            <Button variant="danger" onClick={() => deleteCard(card.id)}>
                                                Delete
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ) :
                            (null)
                        ))
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default MeusCards;
