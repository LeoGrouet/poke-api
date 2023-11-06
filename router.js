const express = require("express");
const APIFetch = require("./client/controllers/apiCallController");

const router = express.Router();

router.get("/", APIFetch.allPokemon);

module.exports = router;
