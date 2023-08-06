const { DataTypes } = require("sequelize");
const { connection } = require("../database/database");

const Produto = connection.define('produto', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_venda: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false
    },
    valor_frete: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false
    },
    valor_desconto: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(14, 2),
    },
});

Produto.beforeCreate((pedido, options) => {
    const valorVenda = parseFloat(pedido.valor_venda);
    const valorFrete = parseFloat(pedido.valor_frete);
    const valorDesconto = parseFloat(pedido.valor_desconto);

    const valorTotal = valorVenda + valorFrete - valorDesconto;
    pedido.valor_total = valorTotal;
});

Produto.beforeUpdate((pedido, options) => {
    const valorVenda = pedido.valor_venda;
    const valorFrete = pedido.valor_frete;
    const valorDesconto = pedido.valor_desconto;

    const valorTotal = valorVenda + valorFrete - valorDesconto;
    pedido.valor_total = valorTotal;
});


module.exports = Produto;
