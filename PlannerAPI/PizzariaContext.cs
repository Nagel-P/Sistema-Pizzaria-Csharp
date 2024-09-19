using Microsoft.EntityFrameworkCore;

namespace PlannerAPI
{
    public class PizzariaContext : DbContext
    {
        public DbSet<Cliente> clientes {get; set; }
        public DbSet<Produto> produtos {get; set; }
        public DbSet<Pedido> pedidos {get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
                "server=localhost;database=pizzaria_db;user=root;password=SerAph#812",
                new MySqlServerVersion(new Version(8, 0, 21)));

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pedido>()
            .HasMany(p => p.Produtos)
            .WithMany();
        }

    }
}