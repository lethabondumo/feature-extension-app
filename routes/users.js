var express = require("express");
var router = express.Router();

/* GET users listing. */

/* router.get("/cleaners", (req, res) => {
  db("SELECT * FROM cleaners ORDER BY id ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

router.get("/cleaners/:id", (req, res) => {
  db(`SELECT * FROM cleaners WHERE id = ${id};`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}); */

router.get("/cleaners/:id", async (rq, res) => {
  db(
    `SELECT * FROM cleaners
    JOIN customers
    ON cleaners.id = customers.id `
  );
});

router.post("/cleaners/add", async (req, res) => {
  console.log(req.body);

  /* 
  //let cleaner = req.params;
  try {
    let result = await db(`SELECT * FROM  cleaners WHERE id = ${cleanerId}`);
    if (result.data.length === 0) {
      res.status(400).send({ error: "item not found" });
    } else {
      await db(`DELETE FROM cleaners WHERE id = ${cleanerId}`);
      (result = await db("SELECT * FROM cleaners")),
        res.status(200).send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  } */
});

router.delete("/cleaners/add/:id", async (req, res) => {
  let cleanerId = req.params.id;
  try {
    let result = await db(`SELECT * FROM  cleaners WHERE id = ${cleanerId}`);
    if (result.data.length === 0) {
      res.status(400).send({ error: "item not found" });
    } else {
      await db(`DELETE FROM cleaners WHERE id = ${cleanerId}`);
      (result = await db("SELECT * FROM cleaners")),
        res.status(200).send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
