const { DataTypes } = require("sequelize");
const { connection } = require("../database/database");

const Vendedor = connection.define('vendedor', {
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
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Vendedor;