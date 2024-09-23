Sistema de Pizzaria - Descrição dos Arquivos e Classes
Este projeto é um sistema para gerenciamento de pedidos em uma pizzaria, desenvolvido em C#. Abaixo, você encontrará uma explicação para cada arquivo e classe utilizada.

Arquivos de Configuração
appsettings.Development.json
Este arquivo contém configurações específicas para o ambiente de desenvolvimento. Inclui detalhes de configuração como strings de conexão com o banco de dados, variáveis de ambiente, e outras propriedades necessárias para a aplicação funcionar localmente em modo de desenvolvimento.

appsettings.json
É o arquivo principal de configurações da aplicação. Aqui ficam as configurações globais como strings de conexão, parâmetros de API e definições gerais. Ele é utilizado em conjunto com o appsettings.Development.json, sendo que este último tem prioridade quando rodando no modo de desenvolvimento.

Classes
BancoDados.cs
Essa classe é responsável por gerenciar a comunicação com o banco de dados. Ela contém métodos para estabelecer a conexão, realizar consultas, inserções, atualizações e exclusões de registros. É essencial para o armazenamento e recuperação de informações da pizzaria, como clientes, pedidos e produtos.

Bebida.cs
A classe Bebida representa uma bebida no sistema. Cada instância dessa classe corresponde a um item de bebida disponível no cardápio da pizzaria. A classe pode incluir propriedades como:

Id: Identificador único da bebida.
Nome: Nome da bebida.
Preço: Valor da bebida.
Cliente.cs
A classe Cliente representa os clientes da pizzaria. Ela armazena as informações relevantes de cada cliente, como:

Id: Identificador único do cliente.
Nome: Nome completo do cliente.
Telefone: Número de telefone de contato.
Endereço: Endereço de entrega para pedidos.
Pedido.cs
Essa classe é a representação de um pedido realizado na pizzaria. Ela gerencia todos os itens pedidos, quantidades, preços e informações de status do pedido. Propriedades típicas incluem:

Id: Identificador único do pedido.
ClienteId: Referência ao cliente que fez o pedido.
Itens: Lista de pizzas e bebidas incluídas no pedido.
Status: Status atual do pedido (ex.: "Em preparo", "Entregue").
Total: Valor total do pedido.
Pizza.cs
A classe Pizza representa uma pizza disponível no cardápio. Cada pizza pode conter propriedades como:

Id: Identificador único da pizza.
Sabor: Sabor ou combinação de sabores da pizza.
Tamanho: Tamanho da pizza (pequena, média, grande).
Preço: Valor da pizza.
Arquivos de Projeto
PlannerApi.csproj
Este arquivo contém as definições e dependências do projeto, como referências a bibliotecas externas, versões do .NET e configurações de build. Ele é gerado e gerenciado pela IDE e controla a estrutura do projeto.

PlannerApi.sln
Arquivo de solução que organiza o projeto e outros subprojetos relacionados dentro do ambiente de desenvolvimento (Visual Studio). Ele facilita o gerenciamento de diferentes componentes e projetos em uma única interface.

Program.cs
Este arquivo é o ponto de entrada da aplicação. Ele contém a função Main, onde a aplicação é inicializada. Em sistemas baseados em API, como uma aplicação ASP.NET Core, ele configura os serviços, o pipeline de requisições HTTP e inicializa o servidor web.

Requests.http
Esse arquivo contém exemplos de requisições HTTP que podem ser usados para testar a API. Ele provavelmente possui diferentes tipos de requisições (GET, POST, PUT, DELETE), facilitando o processo de desenvolvimento e testes da API sem precisar de ferramentas externas como Postman.
