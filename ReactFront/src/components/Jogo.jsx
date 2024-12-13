import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import '../styles/Jogo.css';

function Jogo() {
    const location = useLocation();
    const initialLangToLearn = new URLSearchParams(location.search).get('lang') || 'en';

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentCardIndex, setCurrentCardIndex] = useState(null);
    const [flipped, setFlipped] = useState(false);
    const [langToLearn, setLangToLearn] = useState(initialLangToLearn);

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
                const filteredCards = json.filter(card => card.lang === langToLearn);
                setCards(shuffleArray(filteredCards));
                setCurrentCardIndex(getRandomIndex(filteredCards.length));
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [langToLearn]);

    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const getRandomIndex = (length) => Math.floor(Math.random() * length);

    const flipCard = () => {
        setFlipped(!flipped);
    };

    const nextCard = () => {
        setFlipped(false);
        setCurrentCardIndex((prevIndex) => {
            return (prevIndex + 1) % cards.length;
        });
    };

    const handleLangChange = (e) => {
        setLangToLearn(e.target.value);
    };

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
                                onChange={(e) => setLangToLearn(e.target.value)}
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
                        <Link to="/meus-cards" style={{ textDecoration: 'none', marginRight: '20px' }}>
                            <Button
                                variant="primary"
                                className="d-flex align-items-center gap-2"
                                style={{ borderRadius: '50px', padding: '10px 20px' }}
                            >
                                <span>Voltar</span>
                            </Button>
                        </Link>
                    </Col>
                </Row>

                {loading ? (
                    <Row className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                        <span className="ms-2">Carregando cards...</span>
                    </Row>
                ) : (
                    cards.length > 0 && (
                        <Row className="d-flex justify-content-center">
                            <Col md={4} lg={3} className="mb-4">
                                <div className="card-container">
                                    <div className={`card ${flipped ? 'flipped' : ''}`}>
                                        <div className="front">
                                            <Card className="h-100">
                                                <Card.Body>
                                                    <Card.Title>{cards[currentCardIndex].word}</Card.Title>
                                                    <Card.Text>
                                                        <em>Clique para virar o card e ver a tradução</em>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                        <div className="back">
                                            <Card className="h-100">
                                                <Card.Body>
                                                    <Card.Title>{cards[currentCardIndex].word}</Card.Title>
                                                    <Card.Text>
                                                        <strong>Tradução:</strong> {cards[currentCardIndex].translation}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                                <Card.Footer className="d-flex justify-content-between mt-2">
                                    <Button variant="secondary" onClick={flipCard} style={{ whiteSpace: 'nowrap', marginRight: '2px' }}>
                                        {flipped ? 'Esconder Tradução' : 'Girar Card'}
                                    </Button>
                                    <Button variant="primary" onClick={nextCard} style={{ whiteSpace: 'nowrap' }}>
                                        Próximo Card
                                    </Button>
                                </Card.Footer>
                            </Col>
                        </Row>
                    )
                )}
            </Container>
        </div>
    );
}

export default Jogo;
