import './App.css';
import Cadastro from './pages/Cadastro';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Pizza from './pages/Pizza';
import Pedido from './pages/Pedido';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout><Cadastro/></Layout>} />
      <Route path="/pizzas" element={<Layout><Pizza/></Layout>} />
      <Route path="/pedido" element={<Layout><Pedido/></Layout>} />
    </Routes>
    </>
  );
}

export default App;
