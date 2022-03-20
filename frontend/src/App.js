
import Register from "./components/Register";
import Employees from './components/Employees'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
