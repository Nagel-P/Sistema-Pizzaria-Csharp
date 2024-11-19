using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }

    // Configuração do banco de dados (usando MySQL)
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("server=localhost;database=pizaria;user=root;password=123123");
    }
}
