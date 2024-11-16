public class Pedido
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; }
    public int PizzaId { get; set; }
    public int Quantidade { get; set; }
    public decimal Total { get; set; }
}
    