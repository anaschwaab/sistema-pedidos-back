const { DataTypes } = require("sequelize");
const { connection } = require("../database/database");

const ItensPedido = connection.define('itenspedido', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

});

module.exports = ItensPedido;