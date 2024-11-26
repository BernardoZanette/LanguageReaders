import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Spinner, Form } from "react-bootstrap";

function Books() {
    const [books, setBooks] = useState(null);
    const [pag, setPag] = useState(1);
    const [loading, setLoading] = useState(false);
    const [langToLearn, setLang] = useState('en'); 
    const languages = {
        en: "English",
        pt: "Português",
        ru: "Русский",
        es: "Español",
        fr: "Français",
        de: "Deutsch",
        la: "Latín",
        it: "Italiano",
        ja: "日本語"
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://gutendex.com/books?languages=${langToLearn}&page=${pag}`)
            .then(response => response.json())
            .then(json => {
                setBooks(json.results);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [pag, langToLearn]); 

    console.log(books)
    return (
        <div>
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
                </Row>

                <Row className="my-4">
                    {loading ? (
                        <Col className="d-flex justify-content-center">
                            <Spinner animation="border" variant="primary" />
                            <span className="ms-2">Buscando informações...</span>
                        </Col>
                    ) : (
                        books && books.map((book, index) => (
                            <Col md={4} lg={3} key={index} className="mb-4">
                                <Card className="h-100">
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        {
                                            book.authors[0] ? <Card.Body>Autor: {book.authors[0].name}</Card.Body> : <Card.Body>No defined author</Card.Body>
                                        }
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-end">
                                        <Button variant="link" href={book.formats["text/html"]} target="_blank">
                                            Read more
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

            <Container>
                <Row className="d-flex justify-content-center my-4">
                    <Col className="d-flex align-items-center mx-2">
                        <Button
                            variant="secondary"
                            onClick={() => setPag(pag - 1)}
                            disabled={pag === 1}
                        >
                            &laquo; Previous Page
                        </Button>
                    </Col>
                    <Col>
                            {pag == 1 ? pag : <p>{pag-1} <span className="fw-bold">{pag}</span> {pag+1}</p>}
                    </Col>
                    <Col className="d-flex align-items-center mx-2">
                        <Button
                            variant="secondary"
                            onClick={() => setPag(pag + 1)}
                        >
                            Next Page &raquo;
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Books;
