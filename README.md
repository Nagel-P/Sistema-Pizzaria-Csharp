
# Sistema de Pizzaria - Documentação

Este projeto é um sistema para gerenciamento de pedidos em uma pizzaria, desenvolvido em C#. Abaixo, você encontrará a descrição detalhada dos principais arquivos e classes utilizados no sistema.

## Estrutura de Configuração

### `appsettings.Development.json`
Contém configurações específicas para o ambiente de desenvolvimento, como strings de conexão com o banco de dados, variáveis de ambiente e propriedades necessárias para executar a aplicação localmente no modo de desenvolvimento.

### `appsettings.json`
Este é o arquivo principal de configurações da aplicação. Ele inclui definições globais, como strings de conexão e parâmetros de API. Em conjunto com o `appsettings.Development.json`, este arquivo é utilizado para configurar a aplicação em diferentes ambientes, priorizando o arquivo de desenvolvimento quando o sistema estiver rodando neste modo.

---

## Estrutura de Classes

### `BancoDados.cs`
Responsável por gerenciar a comunicação com o banco de dados. Esta classe fornece métodos para:
- Estabelecer conexões.
- Executar consultas, inserções, atualizações e exclusões.
Essencial para o armazenamento e recuperação de dados relacionados a clientes, pedidos e produtos da pizzaria.

### `Cliente.cs`
Armazena as informações dos clientes da pizzaria. As propriedades principais são:
- **Id**: Identificador único do cliente.
- **Nome**: Nome completo.
- **Telefone**: Número de contato.
- **Endereço**: Endereço de entrega.

### `Pedido.cs`
Classe que gerencia os pedidos realizados. Inclui informações sobre os itens pedidos, o cliente e o status do pedido. Suas propriedades incluem:
- **Id**: Identificador do pedido.
- **ClienteId**: Referência ao cliente.
- **Itens**: Lista de pizzas no pedido.
- **Total**: Valor total do pedido.

### `Pizza.cs`
Representa uma pizza do cardápio, com as seguintes propriedades:
- **Id**: Identificador único.
- **Sabor**: Sabor ou combinação de sabores.
- **Tamanho**: Tamanho da pizza (pequena, média, grande).
- **Preço**: Valor da pizza.

---

## Arquivos do Projeto

### `PlannerApi.csproj`
Arquivo de projeto que define as dependências, bibliotecas externas e configurações do build. Gerenciado pela IDE, ele organiza a estrutura e dependências do projeto.

### `PlannerApi.sln`
Arquivo de solução que agrupa este e outros subprojetos relacionados. Ele facilita a gestão de diferentes componentes dentro da mesma interface de desenvolvimento, como o Visual Studio.

### `Program.cs`
Ponto de entrada da aplicação. Contém a função `Main` e é responsável pela configuração dos serviços e do pipeline de requisições HTTP. Em aplicações ASP.NET Core, ele também inicializa o servidor web.

### `Requests.http`
Arquivo com exemplos de requisições HTTP (GET, POST, PUT, DELETE) para testes da API. Ele auxilia no processo de desenvolvimento, permitindo testes rápidos sem a necessidade de ferramentas externas como o Postman.

---

Este README fornece uma visão clara e objetiva dos principais componentes do sistema de pizzaria. Para mais detalhes ou dúvidas sobre a implementação, consulte a documentação interna ou entre em contato com os desenvolvedores.

