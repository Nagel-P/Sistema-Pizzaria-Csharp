using Microsoft.EntityFrameworkCore;
using PlannerAPI;

class PizzariaContext : DbContext
{
    public DbSet<Cliente> clientes { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<Produto> Produtos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=3306;database=pizzaria_db; user=root;password=SerAph#812");
    }

}