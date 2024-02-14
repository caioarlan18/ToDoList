import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomeRegister } from './components/HomeRegister/HomeRegister';
import { HomeLogin } from './components/HomeLogin/HomeLogin';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Logged } from './components/logged/Logged';
function App() {
  return (
    <Router>


      <Routes>
        <Route exact path='/' element={<HomeRegister />} />
        <Route path='/homeLogin' element={<HomeLogin />} />
        <Route path='/logged' element={<PrivateRoute>
          <Logged />
        </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
