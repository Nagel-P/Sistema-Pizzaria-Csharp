using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlannerApi.Migrations
{
    /// <inheritdoc />
    public partial class AjusteModelos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Total",
                table: "Pedidos");

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_PizzaId",
                table: "Pedidos",
                column: "PizzaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Pizzas_PizzaId",
                table: "Pedidos",
                column: "PizzaId",
                principalTable: "Pizzas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Pizzas_PizzaId",
                table: "Pedidos");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_PizzaId",
                table: "Pedidos");

            migrationBuilder.AddColumn<decimal>(
                name: "Total",
                table: "Pedidos",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
