const { Router } = require("express");
const router = Router();
const Pedido = require("../models/pedido");
const Cliente = require("../models/cliente");
const Vendedor = require("../models/vendedor");
const Transportadora = require("../models/transportadora");
const Produto = require("../models/produto");

router.post("/pedidos", async (req, res) => {
    const { data_inicio, tipo_transporte, pagamento, observacao, vendedorId, transportadoraId, clienteId, produtoIds } = req.body;
    try {
        const cliente = await Cliente.findByPk(clienteId);
        const vendedor = await Vendedor.findByPk(vendedorId);
        const transportadora = await Transportadora.findByPk(transportadoraId);
        
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        
        if (!vendedor) {
            return res.status(404).json({ message: "Vendedor não encontrado." });
        }
        
        if (!transportadora) {
            return res.status(404).json({ message: "Transportadora não encontrada." });
        }

        const produtos = await Produto.findAll({ where: { id: produtoIds } });
        if (!produtos || produtos.length === 0) {
            return res.status(404).json({ message: "Produto(s) não encontrado(s)." });
        }

        const newPedido = await Pedido.create({ 
            data_inicio, 
            tipo_transporte, 
            pagamento, 
            observacao, 
            vendedorId, 
            transportadoraId, 
            clienteId, 
        });

        await newPedido.addProduto(produtos);

        res.status(201).json(newPedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.get("/pedidos", async (req, res) => {
    const { id } = req.query;

    if (id) {
        const pedido = await Pedido.findOne({ include: [Cliente, Vendedor, Transportadora, Produto], where: { id } });
        if (pedido) {
            return res.status(200).json(pedido);
        } else {
            return res.status(404).json({ message: "Pedido não encontrada." });
        }
    }
    const pedidos = await Pedido.findAll({ include: [Cliente, Vendedor, Transportadora, Produto] });
    return res.status(200).json(pedidos);
});

router.put("/pedidos/:id", async (req, res) => {
    const pedido = await Pedido.findByPk(req.params.id);
    const { data_inicio, tipo_transporte, pagamento, observacao, valor_venda, valor_frete, valor_desconto, valor_total, vendedorId, transportadoraId, clienteId, produtoId } = req.body;
    try {
        if (pedido) {
            await Pedido.update(
                { data_inicio, tipo_transporte, pagamento, observacao, valor_venda, valor_frete, valor_desconto, valor_total, vendedorId, transportadoraId, clienteId, produtoId },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Pedido editado com sucesso!" });
        } else {
            res.status(404).json({ message: "Pedido não encontrado." });
        }

    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

router.delete("/pedidos/:id", async (req, res) => {
    const pedido = await Pedido.findOne({ where: { id: req.params.id } });
    try {
        if (pedido) {
            await Pedido.destroy({ where: { id: req.params.id } });
            res.json({ message: "Pedido excluído com sucesso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;