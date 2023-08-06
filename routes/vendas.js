const { Router } = require("express");
const router = Router();
const Pedido = require("../models/pedido");
const Produto = require("../models/produto");
const ItensPedido = require("../models/itensPedido");
const Cliente = require("../models/cliente");
const { Sequelize } = require('sequelize');


// total de vendas geral (resultado da soma de todos os valores de total_venda de todos os pedidos)
// total de vendas por cliente
// total de vendas por produto

// total pedidos geral (quantidade de pedidos feitos)
// total pedidos por cliente
// total pedidos por produto

// router.get("/vendas", async (req, res) => {
//     const { clienteId, produtoId } = req.query;

//     try {
//         if (clienteId) {
//             const vendasPorCliente = await Pedido.sum('valor_total', {
//                 where: { clienteId: clienteId }
//             });
//             console.log(vendasPorCliente);
//             return res.json({ vendasPorCliente });
//         } else if (produtoId) {
//             const vendasPorProduto = await Pedido.sum('valor_total', {
//                 where: { produtoId: produtoId }
//             });
//             return res.json({ vendasPorProduto });
//         } else {
//             const vendas = await Pedido.sum('valor_total');
//             console.log(vendas);
//             res.json({ vendas });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Um erro aconteceu." });
//     }
// });




router.get('/vendas', async (req, res) => {
    const { clienteId, produtoId } = req.query;

    try {
        if (clienteId) {
            const vendasPorCliente = await Pedido.findAll({
                attributes: [
                    'id',
                    [Sequelize.fn('sum', Sequelize.col('produtos.valor_total')), 'vendas_total'],
                ],
                where: { clienteId: clienteId },
                include: [
                    {
                        model: Cliente,
                        attributes: [],
                    },
                    {
                        model: Produto,
                        attributes: [],
                        through: {
                            attributes: [],
                        },
                    },
                ],
                group: ['pedido.id'],
            });

            const totalVendas = vendasPorCliente[0].getDataValue('vendas_total');

            return res.json({ vendasPorCliente: totalVendas });
        } else if (produtoId) {
            const vendasPorProduto = await Pedido.sum('produtos.valor_total', {
                include: [
                    {
                        model: Produto,
                        attributes: [],
                        through: {
                            attributes: [],
                        },
                        where: { id: produtoId },
                    },
                ],
            });

            return res.json({ vendasPorProduto });
        } else {
            const vendas = await Pedido.sum('produtos.valor_total', {
                include: [
                    {
                        model: Produto,
                        attributes: [],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });

            return res.json({ vendas });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Um erro aconteceu.' });
    }
});


// router.get("/vendasitens", async (req, res) => {
//     const { idProduto } = req.query;

//     try {
//         if (idProduto) {
//             const item = await ItensPedido.findOne({ where: { produtoId: idProduto } });

//             if (item) {
//                 const pedido = await Pedido.findOne({ where: { id: item.pedidoId } });

//                 if (pedido) {
//                     const vendasPorItens = pedido.valor_total;
//                     return res.json({ item, vendasPorItens });
//                 } else {
//                     return res.status(404).json({ message: "Pedido não encontrado." });
//                 }
//             } else {
//                 return res.status(404).json({ message: "Item do pedido não encontrado." });
//             }
//         } else {
//             return res.status(400).json({ message: "É necessário informar o número do produto na consulta." });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Um erro aconteceu." });
//     }
// });


router.get("/quantidades", async (req, res) => {
    const { clienteId, produtoId } = req.query;

    try {
        if (clienteId) {
            const quantidadePorCliente = await Pedido.count({
                where: { clienteId: clienteId }
            });
            return res.json({ quantidadePorCliente });
        }
        if (produtoId) {
            const quantidadePorProduto = await ItensPedido.count({
                where: { produtoId: produtoId }
            });
            return res.json({ quantidadePorProduto });
        }
        const quantidades = await Pedido.count();
        res.json({ quantidades });
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
})

module.exports = router;