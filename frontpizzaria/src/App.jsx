import './App.css';
import Cadastro from './pages/Cadastro';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout><Cadastro/></Layout>} />
    </Routes>
    
    </>
  );
}

export default App;
