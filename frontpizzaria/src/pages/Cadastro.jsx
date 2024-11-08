import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro() {
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");

  function listarClientes() {
    axios.get("http://localhost:5208/clientes")
      .then((resposta) => {
        if (Array.isArray(resposta.data)) {
          setClientes(resposta.data);
        } else {
          console.error("Formato inesperado na resposta da API:", resposta.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao listar clientes:", erro);
      });
  }

  useEffect(listarClientes, []);

  function excluir(id) {
    axios.delete("http://localhost:5208/clientes/" + id).then(() => {
      listarClientes();
    });
  }

  function editar(cliente) {
    console.log("editar " + cliente.id + " " + cliente.nome);
    setCliente({
      id: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    });
  }

  function Linha(index, cliente) {
    return (
      <tr key={index}>
        <td>{cliente.id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.telefone}</td>
        <td>{cliente.endereco}</td>
        <td>
          <button onClick={() => excluir(cliente.id)}>Excluir</button>
          <button onClick={() => editar(cliente)}>Editar</button>
        </td>
      </tr>
    );
  }

  function Linhas(clientes) {
    const linhas = [];
    if (Array.isArray(clientes) && clientes.length > 0) {
      for (let i = 0; i < clientes.length; i++) {
        const cliente = clientes[i];
        linhas.push(Linha(i, cliente));
      }
    }
    return linhas;
  }

  function pesquisar() {
    setCliente(null);
  }

  function aoDigitar(e) {
    const { name, value } = e.target;
    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  }

  function salvar() {
    if (cliente.id) {
      axios.put("http://localhost:5208/clientes/" + cliente.id, cliente).then(() => listarClientes());
    } else {
      axios.post("http://localhost:5208/clientes/", cliente).then(() => listarClientes());
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
                  <h1>Cadastro de clientes</h1>
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="nome">Nome completo:</label>
                  <input type="text" id="nome" name="nome" placeholder="Digite o seu nome completo" value={cliente.nome} onChange={aoDigitar} required />
                </div>

                <div className="input-box">
                  <label htmlFor="telefone">Telefone:</label>
                  <input type="tel" id="telefone" name="telefone" placeholder="(xx) xxxxx-xxxx" value={cliente.telefone} onChange={aoDigitar} required />
                </div>

                <div className="input-box">
                  <label htmlFor="endereco">Endereço:</label>
                  <input type="text" id="endereco" name="endereco" placeholder="Digite o seu endereço" value={cliente.endereco} onChange={aoDigitar} required />
                </div>
              </div>

              <div className="cadastro-button">
                <button type="button" onClick={salvar}>Cadastrar</button>
                <button type="button" onClick={pesquisar}>Pesquisar clientes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function novoCliente() {
    setCliente({
      nome: "",
      telefone: "",
      endereco: ""
    });
  }

  function filtrarClientes() {
    if (filtro === "") {
      return clientes;
    }
    return clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  function Tabela() {
    const clientesFiltrados = filtrarClientes();

    return (
      <>
        <div className="login-button">
          <button onClick={novoCliente}>Novo Cliente</button>

          {/* Campo de Pesquisa */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Pesquisar cliente pelo nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          {/* Tabela de Clientes */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {Linhas(clientesFiltrados)}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function conteudoPrincipal() {
    if (cliente == null) {
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
