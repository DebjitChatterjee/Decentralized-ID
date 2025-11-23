import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Concepts from './pages/Concepts';
import Networks from './pages/Networks';
import Architecture from './pages/Architecture';
import Sandbox from './pages/Sandbox';
import Guides from './pages/Guides';

function App() {
    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/concepts" element={<Concepts />} />
                        <Route path="/networks" element={<Networks />} />
                        <Route path="/architecture" element={<Architecture />} />
                        <Route path="/sandbox" element={<Sandbox />} />
                        <Route path="/guides" element={<Guides />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
