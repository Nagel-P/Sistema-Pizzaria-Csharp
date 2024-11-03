import { Form } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro() {
  return (
    <div>
      {Formulario()}
    </div>
  );
}

function Formulario() {
  return (
<div class="form-wrapper">
  <div className="container">
    <div className="form-image">
        <img src="logoCadastro.jpg" alt="Logo de Cadastro" />
    </div>

      <div className="form">
        <form action="#">
          <div className="form-header">
            <div className="title">
              <h1>Cadastre-se</h1>
            </div>

            <div className="login-button">
              <button><a href=""></a>Entrar</button>
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <label htmlFor="nome">Nome completo:</label>
              <input type="text" id="nome" placeholder="Digite o seu nome completo" required />
            </div>

            <div className="input-box">
              <label htmlFor="cpf">CPF:</label>
              <input type="text" name="cpf" id="cpf" placeholder="Digite o seu CPF" required />
            </div>

            <div className="input-box">
              <label htmlFor="endereco">Endereço:</label>
              <input type="text" name="endereco" id="endereco" placeholder="Digite seu endereço" required />
            </div>

            <div className="input-box">
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" placeholder="(xx) xxxxx-xxxx" required />
            </div>

            <div className="input-box">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" placeholder="Digite o seu e-mail" required />
            </div>

            <div className="input-box">
              <label htmlFor="senha">Senha:</label>
              <input type="password" id="senha" placeholder="Digite a sua senha" required />
            </div>

            <div className="input-box">
              <label htmlFor="confirmarSenha">Confirme sua senha:</label>
              <input type="password" id="confirmarSenha" placeholder="Digite a sua senha" required />
            </div>
          </div>

          <div className="cadastro-button">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
}


export default Cadastro;
