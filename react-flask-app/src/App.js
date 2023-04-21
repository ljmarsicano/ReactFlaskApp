import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LoginSignup from './pages/login-signup';
import Personal from './pages/personal';
import Stock from './pages/stock';
import LoginHome from './pages/login-home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login-home' element={<LoginHome />} />
          <Route path='/login-signup' element={<LoginSignup />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/stock' element={<Stock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;