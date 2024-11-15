import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro() {
  const [pedido, setPedido] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [filtro, setFiltro] = useState("");

  function listarPedidos() {
    axios.get("http://localhost:5208/pedidos")
      .then((resposta) => {
        if (Array.isArray(resposta.data)) {
          setPedidos(resposta.data);
        } else {
          console.error("Formato inesperado na resposta da API:", resposta.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao listar pedidos:", erro);
      });
  }

  useEffect(listarPedidos, []);

  function excluir(id) {
    axios.delete("http://localhost:5208/pedidos/" + id).then(() => {
      listarPedidos();
    });
  }

  function editar(pedido) {
    console.log("editar " + pedido.id + " " + pedido.cliente);
    setPedido({
      id: pedido.id,
      cliente: pedido.cliente,
      itens: pedido.itens,
    });
  }

  function Linha(index, pedido) {
    return (
      <tr key={index}>
        <td>{pedido.id}</td>
        <td>{pedido.cliente}</td>
        <td>{pedido.itens}</td>
        <td>
          <button className="delete-btn" onClick={() => excluir(pedido.id)}>Excluir</button>
          <button className="edit-btn" onClick={() => editar(pedido)}>Editar</button>
        </td>
      </tr>
    );
  }

  function Linhas(pedidos) {
    const linhas = [];
    if (Array.isArray(pedidos) && pedidos.length > 0) {
      for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        linhas.push(Linha(i, pedido));
      }
    }
    return linhas;
  }

  function pesquisar() {
    setPedido(null);
  }

  function aoDigitar(e) {
    const { name, value } = e.target;
    setPedido(prevPedido => ({
      ...prevPedido,
      [name]: value
    }));
  }

  function salvar() {
    if (pedido.id) {
      axios.put("http://localhost:5208/pedidos/" + pedido.id, pedido).then(() => listarPedidos());
    } else {
      axios.post("http://localhost:5208/pedidos/", pedido).then(() => listarPedidos());
    }
  }

  function Formulario() {
    return (
      <div className="form-wrapper">
        <div className="container">
          <div className="form-image">
            <img src="logoCadastro.jpg" alt="Logo de Cadastro" />
          </div>

          <div className="form">
            <form action="#">
              <div className="form-header">
                <div className="title">
                  <h1>Cadastro de pedidos</h1>
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="nome">Cliente:</label>
                  <input type="text" id="nome" name="nome" placeholder="Digite o seu nome completo" value={pedido.nome} onChange={aoDigitar} required />
                </div>

                <div className="input-box">
                  <label htmlFor="telefone">Itens:</label>
                  <input type="tel" id="telefone" name="telefone" placeholder="(xx) xxxxx-xxxx" value={pedido.telefone} onChange={aoDigitar} required />
                </div>

              </div>

              <div className="cadastro-button">
                <button type="button" onClick={salvar}>Cadastrar</button>
                <button type="button" onClick={pesquisar}>Pesquisar pedidos</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function novoPedido() {
    setPedido({
      cliente: "",
      itens: "",
    });
  }

  function filtrarPedidos() {
    if (filtro === "") {
      return pedidos;
    }
    return pedidos.filter(pedido =>
      pedido.nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  function Tabela() {
    const clientesFiltrados = filtrarPedidos();

    return (
      <>

      <h2 className="titulo-pedidos">pedidos Cadastrados</h2>

        <div className="login-button">
          

          {/* Campo de Pesquisa */}
          <div className="barra-pesquisa">
            <input
              type="text"
              placeholder="Pesquisar pedido pelo nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}/>

              <button onClick={novoPedido}>Novo pedido</button>
          </div>

          {/* Tabela de pedidos */}
          <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Itens</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Linhas(clientesFiltrados)}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }

  function conteudoPrincipal() {
    if (pedido == null) {
      return Tabela();
    } else {
      return Formulario();
    }
  }

  return (
    <div>
      {conteudoPrincipal()}
    </div>
  );
}

export default Cadastro;
