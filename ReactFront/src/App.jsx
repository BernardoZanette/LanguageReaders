import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Books from './components/Books'
import MeusCards from './components/MeusCards'
import Jogo from './components/Jogo'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Books />}/>
        <Route path="/meus-cards" element={<MeusCards />} />
        <Route path="/jogo" element={<Jogo />} />
      </Routes>
    </Router>
  );
}

export default App;