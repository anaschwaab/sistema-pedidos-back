const { Router } = require("express");
const router = Router();
const Produto = require("../models/produto");


router.post("/produtos", async (req, res) => {
    const { nome, origem, valor_venda, valor_frete, valor_desconto, valor_total } = req.body;
    try {
        const newProduto = await Produto.create({ nome, origem, valor_venda, valor_frete, valor_desconto, valor_total })
        res.status(201).json(newProduto)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Um erro aconteceu "})
    }
});

router.get("/produtos", async (req, res) => {
    const { id } = req.query;

    if (id) {
        const produto = await Produto.findByPk(id);
        if (produto) {
            return res.status(200).json(produto);
        } else {
            return res.status(404).json({ message: "Produto não encontrada." });
        }
    }
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
});

router.put("/produtos/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    const { nome, origem, valor_venda, valor_frete, valor_desconto, valor_total } = req.body;
    try {
        if (produto) {
            await Produto.update(
                { nome, origem, valor_venda, valor_frete, valor_desconto, valor_total },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Produto editado com sucesso!"});
        } else {
            res.status(404).json({ message: "Produto não encontrado." });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Um erro aconteceu."});
    }
});

router.delete("/produtos/:id", async (req, res) => {
    const produto = await Produto.findOne({ where: { id: req.params.id } });
    try {
        if (produto) {
            await Produto.destroy({ where: { id: req.params.id } });
            res.json({ message: "Produto excluído com sucesso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;