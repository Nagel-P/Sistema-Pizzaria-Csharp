import { Form } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
  return (
    <div>
      <h2>Cadastro de clientes</h2>
      {Formulario()}
      {Tabela()}
    </div>
  );
}

function Formulario() {
  return (
    <>
      <div class="formulario-container">
        <form action="form-clientes">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required />

          <label htmlFor="cpf">CPF: </label>
          <input type="text" name="cpf" id="cpf" required />

          <label htmlFor="endereco">Endereço: </label>
          <input type="text" name="endereco" id="endereco" required />

          <label htmlFor="telefone">Telefone: </label>
          <input type="tel" id="telefone" name="telefone" required />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}

function Tabela() {
  return (
    <div class="table-cliente">
      <table>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Endereço</th>
          <th>Telefone</th>
          <th>Ações</th>
        </tr>

        <tr>
          <td>Igor Mordaski</td>
          <td>06367050990</td>
          <td>Rua Teofilo Freitas Maristany</td>
          <td>41 98465-3839</td>

          <button class="remove">Remover</button>
          <button class="edit">Editar</button>
        </tr>
      </table>
    </div>
  );
}

export default Home;
