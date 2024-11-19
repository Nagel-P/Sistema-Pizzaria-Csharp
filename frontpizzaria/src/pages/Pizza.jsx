import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro() {
  const [pizza, setPizza] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [filtro, setFiltro] = useState("");

  function listarPizzas() {
    axios.get("http://localhost:5208/pizzas")
      .then((resposta) => {
        if (Array.isArray(resposta.data)) {
          setPizzas(resposta.data);
        } else {
          console.error("Formato inesperado na resposta da API:", resposta.data);
        }
      })
      .catch((erro) => {
        console.error("Erro ao listar pizzas:", erro);
      });
  }

  useEffect(listarPizzas, []);

  function excluir(id) {
    axios.delete("http://localhost:5208/pizzas/" + id).then(() => {
      listarPizzas();
    });
  }

  function editar(pizza) {
    console.log("editar " + pizza.id + " " + pizza.nome);
    setPizza({
      id: pizza.id,
      nome: pizza.nome,
      preco: pizza.preco,
      tamanho: pizza.tamanho
    });
  }

  function Linha(index, pizza) {
    return (
      <tr key={index}>
        <td>{pizza.id}</td>
        <td>{pizza.nome}</td>
        <td>{pizza.preco}</td>
        <td>{pizza.tamanho}</td>
        <td>
          <button className="delete-btn" onClick={() => excluir(pizza.id)}>Excluir</button>
          <button className="edit-btn" onClick={() => editar(pizza)}>Editar</button>
        </td>
      </tr>
    );
  }

  function Linhas(pizzas) {
    const linhas = [];
    if (Array.isArray(pizzas) && pizzas.length > 0) {
      for (let i = 0; i < pizzas.length; i++) {
        const pizza = pizzas[i];
        linhas.push(Linha(i, pizza));
      }
    }
    return linhas;
  }

  function pesquisar() {
    setPizza(null);
  }

  function aoDigitar(e) {
    const { name, value } = e.target;
    setPizza(prevPizza => ({
      ...prevPizza,
      [name]: value
    }));
  }

  function salvar() {
    if (pizza.id) {
      axios.put("http://localhost:5208/pizzas/" + pizza.id, pizza).then(() => listarPizzas());
    } else {
      axios.post("http://localhost:5208/pizzas/", pizza).then(() => listarPizzas());
    }
  }

  function Formulario() {
    return (
      <div className="form-wrapper">
        <div className="container">
          <div className="form-image-pizza">
            <img src="logoCadastro.jpg" alt="Logo de Cadastro" />
          </div>

          <div className="form">
            <form action="#">
              <div className="form-header">
                <div className="title">
                  <h1>Cadastro de pizzas</h1>
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="nome">Nome:</label>
                  <input type="text" id="nome" name="nome" placeholder="Digite o nome da Pizza" value={pizza.nome} onChange={aoDigitar} required />
                </div>

                <div className="input-box">
                  <label htmlFor="preco">Preço:</label>
                  <input type="tel" id="preco" name="preco" placeholder="xxx" value={pizza.preco} onChange={aoDigitar} required />
                </div>

                <div className="input-box">
                  <label htmlFor="tamanho">Tamanho:</label>
                  <input type="text" id="tamanho" name="tamanho" placeholder="Digite o seu endereço" value={pizza.tamanho} onChange={aoDigitar} required />
                </div>
              </div>

              <div className="cadastro-button">
                <button type="button" onClick={salvar}>Cadastrar</button>
                <button type="button" onClick={pesquisar}>Pesquisar pizzas</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  function novoPizza() {
    setPizza({
      nome: "",
      preco: "",
      tamanho: ""
    });
  }

  function filtrarPizzas() {
    if (filtro === "") {
      return pizzas;
    }
    return pizzas.filter(pizza =>
      pizza.nome.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  function Tabela() {
    const pizzasFiltrados = filtrarPizzas();

    return (
      <>

      <h2 className="titulo-pizzas">Pizzas Cadastradas</h2>

        <div className="login-button">
          

          {/* Campo de Pesquisa */}
          <div className="barra-pesquisa">
            <input
              type="text"
              placeholder="Pesquisar pizza pelo nome"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}/>

              <button onClick={novoPizza}>Nova Pizza</button>
          </div>

          {/* Tabela de Pizzas */}
          <div class="table-container">
          <table className="pizza-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Tamanho</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Linhas(pizzasFiltrados)}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }

  function conteudoPrincipal() {
    if (pizza == null) {
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
