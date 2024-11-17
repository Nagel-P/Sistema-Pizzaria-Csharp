using Microsoft.EntityFrameworkCore;

// Configurações da aplicação
var builder = WebApplication.CreateBuilder(args);

// Configuração do Swagger para documentação
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do Entity Framework para usar MySQL
builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

// Habilitar Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Endpoints da API
app.MapGet("/", () => "API da Pizzaria");

// CRUD para a entidade Pizza
app.MapGet("/pizzas", async (AppDbContext db) => await db.Pizzas.ToListAsync());

app.MapGet("/pizzas/{id}", async (int id, AppDbContext db) =>
    await db.Pizzas.FindAsync(id) is Pizza pizza
        ? Results.Ok(pizza)
        : Results.NotFound());

app.MapPost("/pizzas", async (Pizza pizza, AppDbContext db) => {
    db.Pizzas.Add(pizza);
    await db.SaveChangesAsync();
    return Results.Created($"/pizzas/{pizza.Id}", pizza);
});

app.MapPut("/pizzas/{id}", async (int id, Pizza pizzaAlterada, AppDbContext db) => {
    var pizza = await db.Pizzas.FindAsync(id);
    if (pizza is null) return Results.NotFound();

    pizza.Nome = pizzaAlterada.Nome;
    pizza.Preco = pizzaAlterada.Preco;
    pizza.Tamanho = pizzaAlterada.Tamanho;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/pizzas/{id}", async (int id, AppDbContext db) => {
    if (await db.Pizzas.FindAsync(id) is Pizza pizza)
    {
        db.Pizzas.Remove(pizza);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

// CRUD para a entidade Pedido

// Retorna pedidos no formato DTO
app.MapGet("/pedidos", async (AppDbContext db) =>
{
    var pedidos = await db.Pedidos
        .Include(p => p.Cliente) // Inclui o relacionamento com Cliente
        .ToListAsync();

    var pedidosDto = pedidos.Select(p => new PedidoDTO
    {
        Id = p.Id,
        ClienteId = p.ClienteId,
        NomeCliente = p.Cliente.Nome, // Nome do cliente para o front
        PizzaId = p.PizzaId,
        Quantidade = p.Quantidade,
        Total = p.Total
    }).ToList();

    return Results.Ok(pedidosDto);
});

app.MapPost("/pedidos", async (Pedido pedido, AppDbContext db) => {
    db.Pedidos.Add(pedido);
    await db.SaveChangesAsync();

    // Recuperar o cliente associado para retornar o DTO completo
    var cliente = await db.Clientes.FindAsync(pedido.ClienteId);

    var pedidoDto = new PedidoDTO
    {
        Id = pedido.Id,
        ClienteId = pedido.ClienteId,
        NomeCliente = cliente?.Nome, // Nome do cliente
        PizzaId = pedido.PizzaId,
        Quantidade = pedido.Quantidade,
        Total = pedido.Total
    };

    return Results.Created($"/pedidos/{pedido.Id}", pedidoDto);
});

app.MapPut("/pedidos/{id}", async (int id, Pedido pedidoAlterado, AppDbContext db) => {
    var pedido = await db.Pedidos.FindAsync(id);
    if (pedido is null) return Results.NotFound();

    pedido.ClienteId = pedidoAlterado.ClienteId;
    pedido.PizzaId = pedidoAlterado.PizzaId;
    pedido.Quantidade = pedidoAlterado.Quantidade;
    pedido.Total = pedidoAlterado.Total;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/pedidos/{id}", async (int id, AppDbContext db) => {
    if (await db.Pedidos.FindAsync(id) is Pedido pedido)
    {
        db.Pedidos.Remove(pedido);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

// CRUD para a entidade Cliente
app.MapGet("/clientes", async (AppDbContext db) => await db.Clientes.ToListAsync());

app.MapGet("/clientes/{id}", async (int id, AppDbContext db) =>
    await db.Clientes.FindAsync(id) is Cliente cliente
        ? Results.Ok(cliente)
        : Results.NotFound());

app.MapPost("/clientes", async (Cliente cliente, AppDbContext db) => {
    db.Clientes.Add(cliente);
    await db.SaveChangesAsync();
    return Results.Created($"/clientes/{cliente.Id}", cliente);
});

app.MapPut("/clientes/{id}", async (int id, Cliente clienteAlterado, AppDbContext db) => {
    var cliente = await db.Clientes.FindAsync(id);
    if (cliente is null) return Results.NotFound();

    cliente.Nome = clienteAlterado.Nome;
    cliente.Telefone = clienteAlterado.Telefone;
    cliente.Endereco = clienteAlterado.Endereco;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/clientes/{id}", async (int id, AppDbContext db) => {
    if (await db.Clientes.FindAsync(id) is Cliente cliente)
    {
        db.Clientes.Remove(cliente);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

// Rodar a aplicação
app.Run();

// DTO para Pedido
public class PedidoDTO
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public string NomeCliente { get; set; }
    public int PizzaId { get; set; }
    public int Quantidade { get; set; }
    public decimal Total { get; set; }
}
