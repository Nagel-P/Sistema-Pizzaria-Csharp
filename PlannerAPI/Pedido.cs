namespace PlannerAPI
{
    public class Pedido
    {
        public int Id { get; set; }
        public Cliente Cliente { get; set; }
        public List<Produto> Produtos { get; set; }

        public Pedido(int id, Cliente clietne, List<Produto> produtos)
        {
            Id = id;
            Cliente = clietne;
            Produtos = produtos;
        }

        public string Detalhes()
        {
            var detalhes = $"Pedido Id: {Id}, Cliente: {Cliente.Nome}, Produtos: \n";

            foreach (var produto in Produtos)
            {
                detalhes += $"- {produto.Nome} (Id: {produto.Id}, Preço: R$ {produto.Preco})\n";
            }
        
            return detalhes;
        }
    }
}