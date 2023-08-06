const { DataTypes } = require("sequelize");
const { connection } = require("../database/database");

const Transportadora = connection.define('transportadora', {
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
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacao: {
        type: DataTypes.STRING
    }
})

module.exports = Transportadora;