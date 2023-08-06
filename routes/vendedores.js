const { Router } = require("express");
const router = Router();
const Vendedor = require("../models/vendedor");


router.post("/vendedores", async (req, res) => {
    const { nome, cargo } = req.body;
    try {
        const newVendedor = await Vendedor.create({ nome, cargo })
        res.status(201).json(newVendedor)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Um erro aconteceu "})
    }
});

router.get("/vendedores", async (req, res) => {
    const { id } = req.query;

    if (id) {
        const vendedor = await Vendedor.findByPk(id);
        if (vendedor) {
            return res.status(200).json(vendedor);
        } else {
            return res.status(404).json({ message: "Vendedor não encontrada." });
        }
    }
    const vendedores = await Vendedor.findAll();
    return res.status(200).json(vendedores);
});

router.put("/vendedores/:id", async (req, res) => {
    const vendedor = await Vendedor.findByPk(req.params.id);
    const { nome, cargo } = req.body;
    try {
        if (vendedor) {
            await Vendedor.update(
                { nome, cargo },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Vendedor editado com sucesso!"});
        } else {
            res.status(404).json({ message: "Vendedor não encontrado." });
        }
        
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu."});
    }
});

router.delete("/vendedores/:id", async (req, res) => {
    const vendedor = await Vendedor.findOne({ where: { id: req.params.id } });
    try {
        if (vendedor) {
            await Vendedor.destroy({ where: { id: req.params.id } });
            res.json({ message: "Vendedor excluído com sucesso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;