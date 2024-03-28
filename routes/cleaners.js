let express = require("express");
let router = express.Router();
let db = require("../model/helper");

// GET all cleaners from the DB
router.get("/", (req, res, next) => {
    db("SELECT * FROM cleaners;")
    .then(results => {
        res.send(results.data); 
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error); 
    });
});

// GET one cleaner from the DB
router.get("/:id", (req, res, next) => {
    db(`SELECT * FROM cleaners WHERE id=${req.params.id};`)
    .then(results => {
        res.send(results.data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).send(error);
    });
});

// INSERT a new cleaner into the DB
router.post("/", async (req, res, next) => {
    let {
        firstname, 
        lastname, 
        date_of_birth,
        email, 
        phone_country, 
        phone_number, 
        hourly_rate,
        usual_availability
    } = req.body;

    try {
        await db(`INSERT INTO cleaners 
            (firstname, lastname, date_of_birth, email, phone_country, phone_number, hourly_rate, usual_availability) 
            VALUES 
            ("${firstname}", "${lastname}", "${date_of_birth}", "${email}", "${phone_country}", "${phone_number}", "${hourly_rate}", "${usual_availability}")`);

        let response = await db("SELECT * FROM cleaners;");
        res.send(response.data);
    } catch(error) {
        if (error.code === "ER_DUP_ENTRY") {
            res.status(400).send("The email address provided already exists.");
        } else {
            res.status(500).send(error);
        }
    }
});

// DELETE a cleaner from the DB
router.delete("/:id", async (req, res, next) => {
    let id = req.params.id;
    try {
        await db(`DELETE FROM cleaners WHERE id = ${id};`);
        let response = await db("SELECT * FROM cleaners;");
        res.send(response.data);
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;
