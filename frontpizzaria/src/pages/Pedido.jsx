import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro() {
  const [pedido, setPedido] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]); // Estado para armazenar a lista de clientes
  const [pizzas, setPizzas] = useState([]); 
  const [filtro, setFiltro] = useState("");

  // Função para listar os pedidos
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

  // Função para listar os clientes
  function listarClientes() {
    axios.get("http://localhost:5208/clientes") // Supondo que a API de clientes esteja disponível
      .then((resposta) => {
        if (Array.isArray(resposta.data)) {
          setClientes(resposta.data);
        } else {
          console.error("Formato inesperado na resposta da API de clientes:", resposta.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao listar clientes:", erro);
      });
  }

  function listarPizzas() {
    axios.get("http://localhost:5208/pizzas") // Supondo que a API de pizzas esteja disponível
      .then((resposta) => {
        if (Array.isArray(resposta.data)) {
          setPizzas(resposta.data);
        } else {
          console.error("Formato inesperado na resposta da API de pizzas:", resposta.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao listar pizzas:", erro);
      });
  }

  useEffect(() => {
    listarPedidos();
    listarClientes();
    listarPizzas(); // Carregar a lista de clientes na inicialização
  }, []);

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
      pizza: pedido.pizza,
    });
  }

  function Linha(index, pedido) {
    return (
      <tr key={index}>
        <td>{pedido.id}</td>
        <td>{pedido.nomeCliente}</td>
        <td>{pedido.nomePizza}</td>
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
    const payload = {
      id: pedido.id,
      clienteId: pedido.cliente,
      pizzaId: pedido.pizza,
    }
    if (pedido.id) {
      axios.put("http://localhost:5208/pedidos/${pedido.id}", payload).then(() => listarPedidos());
    } else {
      axios.post("http://localhost:5208/pedidos/", payload).then(() => listarPedidos());
    }
  }

  function Formulario() {
    return (
      <div className="form-wrapper">
        <div className="container">
          <div className="form-image-pedido">
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
                  <label htmlFor="cliente">Cliente:</label>
                  <select
                    id="cliente"
                    name="cliente"
                    value={pedido.nomeCliente}
                    onChange={aoDigitar}
                    required
                  >
                    <option value="">Selecione um cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                <div className="input-box">
                  <label htmlFor="pizza">Pizza:</label>
                  <select
                    id="pizza"
                    name="pizza"
                    value={pedido.nomePizza}
                    onChange={aoDigitar}
                    required
                  >
                    <option value="">Selecione uma pizza</option>
                    {pizzas.map((pizza) => (
                      <option key={pizza.id} value={pizza.id}>
                        {pizza.nome}
                      </option>
                    ))}
                  </select>
                </div>
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
      pizza: "",
    });
  }

  function filtrarPedidos() {
    if (filtro === "") {
      return pedidos;
    }
    return pedidos.filter(pedido =>
      pedido.cliente.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  function Tabela() {
    const pedidosFiltrados = filtrarPedidos();

    return (
      <>
        <h2 className="titulo-pedidos">Pedidos Cadastrados</h2>

        <div className="login-button">
          <div className="barra-pesquisa">
            <input
              type="text"
              placeholder="Pesquisar pedido pelo nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <button onClick={novoPedido}>Novo pedido</button>
          </div>

          <div className="table-container">
            <table className="pedido-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Pizza</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {Linhas(pedidosFiltrados)}
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
