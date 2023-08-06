const { DataTypes } = require("sequelize");
const { connection } = require("../database/database");
const Transportadora = require("./transportadora");
const Cliente = require("./cliente");
const Vendedor = require("./vendedor");

const Pedido = connection.define('pedido', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipo_transporte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pagamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacao: {
        type: DataTypes.STRING,
    }
});


Pedido.belongsTo(Cliente);
Pedido.belongsTo(Transportadora);
Pedido.belongsTo(Vendedor);

module.exports = Pedido;