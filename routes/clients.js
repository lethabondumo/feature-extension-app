let express = require("express");
let router = express.Router();
let db = require("../model/helper");

// GET all clients from the DB
router.get("/", (req, res, next) => {
    db("SELECT * FROM clients;")
    .then(results => {
        res.send(results.data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error);
    });
});

// GET one client from the DB
router.get("/:id", (req, res, next) => {
    db(`SELECT * FROM clients WHERE id=${req.params.id};`)
    .then(results => {
        res.send(results.data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error);
    });
});

// INSERT a new client into the DB
router.post("/", async (req, res, next) => {
    let { firstname, lastname, email, phone, address } = req.body;
    try {
        await db(`INSERT INTO clients (firstname, lastname, email, phone, address) VALUES ("${firstname}", "${lastname}", "${email}", "${phone}", "${address}");`);
        let response = await db("SELECT * FROM clients;");
        res.send(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// DELETE a client from the DB
router.delete("/:id", async (req, res, next) => {
    let id = req.params.id;
    try {
        await db(`DELETE FROM clients WHERE id=${id};`);
        let response = await db("SELECT * FROM clients;");
        res.send(response.data);
    } catch(error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
