import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout><Home/></Layout>} />
    </Routes>
    
    </>
  );
}

export default App;
