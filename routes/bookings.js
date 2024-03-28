const express = require("express");
const router = express.Router();
const db = require("../model/helper");

// GET all bookings from the DB
router.get("/", function(req, res, next) {
    db("SELECT * FROM bookings;")
    .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });

// GET one booking from the DB
router.get("/:id", function(req, res, next) {
    db(`SELECT * FROM bookings WHERE id=${req.params.id};`)
    .then(results => {
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });

// INSERT a new booking into the DB
router.post("/", async function(req, res, next) {
    let {
        firstname,
        lastname,
        booking_date,
        start_time,
        end_time,
        phone_country,
        phone_number,
        building_type,
        street_number,
        street_name,
        apartment_building_name,
        apartment_number,
        complex_name,
        unit_number,
        other_address_description,
        area
    } = req.body;
    
   try {
    await db(`INSERT INTO bookings (
        firstname, 
        lastname, 
        booking_date, 
        start_time, 
        end_time, 
        phone_country, 
        phone_number, 
        building_type, 
        street_number, 
        street_name, 
        apartment_building_name, 
        apartment_number, 
        complex_name, 
        unit_number, 
        other_address_description, area
        ) VALUES (
            "${firstname}", 
            "${lastname}", 
            "${booking_date}", 
            "${start_time}", 
            "${end_time}", 
            "${phone_country}", 
            "${phone_number}", 
            "${building_type}", 
            "${street_number}", 
            "${street_name}", 
            "${apartment_building_name}", 
            "${apartment_number}", 
            "${complex_name}", 
            "${unit_number}", 
            "${other_address_description}", 
            "${area}"
            );`);
            let response = await db("SELECT * FROM bookings;")
            res.send(response.data); 
        } catch(error) {
            if (error.code === "ER_DUP_ENTRY") {
                res.status(400).send("The email address provided already exists.");
            } else {
                res.status(500).send(error);
            }
        }
    });

// DELETE a booking from the DB
router.delete("/:id", async function(req, res, next) {
    let id = req.params.id;
    try {
        await db(`DELETE FROM bookings WHERE id=${id};`);
        let response = await db("SELECT * FROM bookings;")
        res.send(response.data);
    } catch(error) {
        res.status(500).send(error);
    }
});



module.exports = router;