require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./database/database");
const cors = require("cors");

const ItensPedido = require("./models/itensPedido");
const Produto = require("./models/produto");
const Pedido = require("./models/pedido");

module.exports = { Produto, Pedido, ItensPedido};

Pedido.belongsToMany(Produto, { through: { model: ItensPedido }, foreignKey: 'pedidoId', constraint: true });

Produto.belongsToMany(Pedido, { through: { model: ItensPedido }, foreignKey: 'produtoId', constraint: true });

const routeProdutos = require("./routes/produtos");
const routeVendedor = require("./routes/vendedores");
const routeTransportadoras = require("./routes/transportadoras");
const routeClientes = require("./routes/clientes");
const routePedidos = require("./routes/pedidos");
const routeVendas = require("./routes/vendas");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(routeProdutos);
app.use(routeVendedor);
app.use(routeTransportadoras);
app.use(routeClientes);
app.use(routePedidos);
app.use(routeVendas);

authenticate(connection);
connection.sync().then(() => {
    console.log('Tabelas criadas com sucesso!');
})
    .catch((err) => {
        console.error('Erro ao criar tabelas:', err);
    });

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001/");
});