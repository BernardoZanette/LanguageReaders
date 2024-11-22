import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function Books() {
    
    const [books, setBooks] = useState(null);
    const [pag, setPag] = useState(1);
    const [loading, setLoading] = useState(false);
    const [langToLearn, setLang] = useState('en');

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
    }, [pag]);

    console.log(books)

    return (
        <div>
            <Container>
                {books && books.map((book, index) => {
                        return <div key={index}>{book.title}</div>
                    })
                }
            </Container>
            <div>
                {loading && <div>Buscando informações...</div>}
                <div onClick={() => setPag(pag+1)}>Next Page</div>
            </div>
        </div>
    )
}

export default Books
