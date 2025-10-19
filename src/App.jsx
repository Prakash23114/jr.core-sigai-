import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import HtmlReference from './pages/HtmlReference.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/html-reference" element={<HtmlReference />} />
      </Routes>
    </Router>
  );
}

export default App;