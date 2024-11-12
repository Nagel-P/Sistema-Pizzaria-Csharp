import { NavLink } from "react-router-dom";

function Header() {
  return <>
  <header>
    <div class="cabecalho">    
        <div class="logo"><img src="/logoPizza.jpg"alt="logo"/></div>

        <h1 class="nome-pizzaria">Pizzaria - É us Guri</h1>
        
        <div class="menu">
            <nav>
              <ul>
                <li><NavLink to ="/">Cadastro</NavLink></li>
                <li><NavLink to ="/pizzas">Pizzas</NavLink></li>
                <li><NavLink to ="pedido">Pedidos</NavLink></li>
              </ul>
            </nav>
        </div>
    </div>
  </header>
  </>;
}

export default Header;
