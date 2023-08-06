const { Router } = require("express");
const router = Router();
const Transportadora = require("../models/transportadora");


router.post("/transportadoras", async (req, res) => {
    const { nome, endereco, cidade, estado, observacao } = req.body;
    try {
        const newTransportadora = await Transportadora.create({ nome, endereco, cidade, estado, observacao })
        res.status(201).json(newTransportadora)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Um erro aconteceu"})
    }
});

router.get("/transportadoras", async (req, res) => {
    const { id } = req.query;

    if (id) {
        const transportadora = await Transportadora.findByPk(id);
        if (transportadora) {
            return res.status(200).json(transportadora);
        } else {
            return res.status(404).json({ message: "Tranportadora não encontrada." });
        }
    }
    const transportadora = await Transportadora.findAll();
    return res.status(200).json(transportadora);
});

router.put("/transportadoras/:id", async (req, res) => {
    const transportadora = await Transportadora.findByPk(req.params.id);
    const { nome, endereco, cidade, estado, observacao } = req.body;
    try {
        if (transportadora) {
            await Transportadora.update(
                { nome, endereco, cidade, estado, observacao },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Transportadora editado com sucesso!"});
        } else {
            res.status(404).json({ message: "Transportadora não encontrado." });
        }
        
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu."});
    }
});

router.delete("/transportadoras/:id", async (req, res) => {
    const transportadora = await Transportadora.findOne({ where: { id: req.params.id } });
    try {
        if (transportadora) {
            await Transportadora.destroy({ where: { id: req.params.id } });
            res.json({ message: "Transportadora excluída com sucesso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;