namespace PlannerAPI
{
    public class Cliente
    {
        
        public int Cpf { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }

        public Cliente(int cpf, string nome, string endereco, string telefone)
        {
            Cpf = cpf;
            Nome = nome;
            Endereco = endereco;
            Telefone = telefone;
        }

        public string Detalhes()
        {
            return $"Cliente: {Nome}, Endereço: {Endereco}, Telefone: {Telefone}";
        }

        
        

    }
}