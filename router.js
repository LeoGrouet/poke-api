const express = require("express");
const APIFetch = require("./client/controllers/apiCallController");

const router = express.Router();

router.get("/", APIFetch.allPokemon);
router.get("/pokemon/:name", APIFetch.onePokemonByName);

module.exports = router;
