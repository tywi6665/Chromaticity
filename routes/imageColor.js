const router = require("express").Router();
const express = require("express");
const shutterstock = require("shutterstock");
const keys = require("../keys");
require("dotenv").config();

// routes
router.get("/:color", function (req, res) {
    
    var api = shutterstock.v2({
        clientId: keys.clientId,
        clientSecret: keys.clientSecret
    });

    api.image.search({ color: req.params.color }, function (err, data) {
        if (err) throw err;
        return res.json(data);
    });

});

module.exports = router;