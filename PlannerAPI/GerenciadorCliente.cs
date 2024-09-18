namespace PlannerAPI {

    public class GerenciadorCliente{

        private List<Cliente> clientes = new List<Cliente>();

        public void CadastrarCliente (Cliente cliente) {
            clientes.Add(cliente);
        }
    }
}