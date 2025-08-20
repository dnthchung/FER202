import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './pages/MoviePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="container mt-5">
                            <h1 className="text-center">FER202 - Practical Exam given</h1>
                        </div>
                    }
                />
                <Route path="/movies" element={<MoviePage />} />
            </Routes>
        </Router>
    );
}

export default App;