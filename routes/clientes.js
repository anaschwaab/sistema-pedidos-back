const { Router } = require("express");
const router = Router();
const Cliente = require("../models/cliente");


router.post("/clientes", async (req, res) => {
    const { nome, endereco, cidade, estado, observacao } = req.body;
    try {
        const newCliente = await Cliente.create({ nome, endereco, cidade, estado, observacao })
        res.status(201).json(newCliente)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Um erro aconteceu "})
    }
});

router.get("/clientes", async (req, res) => {
    const { id } = req.query;

    if (id) {
        const cliente = await Cliente.findByPk(id);
        if (cliente) {
            return res.status(200).json(cliente);
        } else {
            return res.status(404).json({ message: "Cliente não encontrada." });
        }
    }
    const clientes = await Cliente.findAll();
    return res.status(200).json(clientes);
});

router.put("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    const { nome, endereco, cidade, estado, observacao } = req.body;
    try {
        if (cliente) {
            await Cliente.update(
                { nome, endereco, cidade, estado, observacao },
                { where: { id: req.params.id } }
            );
            res.json({ message: "Cliente editado com sucesso!"});
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });
        }
        
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu."});
    }
});

router.delete("/clientes/:id", async (req, res) => {
    const cliente = await Cliente.findOne({ where: { id: req.params.id } });
    try {
        if (cliente) {
            await Cliente.destroy({ where: { id: req.params.id } });
            res.json({ message: "Cliente excluído com sucesso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// router.put("/talks/:id", hasRole(["superAdmin", "admin", "organizador"]), schemaTalksPut, async (req, res) => {
//     const { name, startDate, endDate, eventId, speakerId } = req.body;
//     const talk = await Talk.findByPk(req.params.id);

//     try {
//         if (talk) {
//             await Talk.update( 
//                 { name, startDate, endDate, eventId, speakerId },
//                 { where: { id: req.params.id } } 
//             );
//             res.json({ message: "Palestra editada com sucesso!" });
//         } else {
//             res.status(404).json({ message: "Palestra não encontrada." });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Um erro aconteceu." });
//     }
// });

// router.delete("/talks/:id", hasRole(["superAdmin", "admin", "organizador"]), async (req, res) => {
//     const talk = await Talk.findOne({ where: { id: req.params.id } });
//     try {
//         if (talk) {
//             await Talk.destroy({ where: { id: req.params.id } });
//             res.json({ message: "Palestra deletada com sucesso." });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Um erro aconteceu." });
//     }
// });

module.exports = router;