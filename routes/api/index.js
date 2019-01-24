const router = require("express").Router();
const express = require("express");
const shutterstock = require("shutterstock");
const app = express();
const keys = require("../../keys");
require("dotenv").config();

// routes
router.get("/shutterstock/:color", function (req, res) {

    var api = shutterstock.v2({
        clientId: keys.shutterstock.clientId,
        clientSecret: keys.shutterstock.clientSecret
    });

    api.image.search({ color: req.params.color }, function (err, data) {
        if (err) throw err;
        return res.json(data);
    });

})

module.exports = router;