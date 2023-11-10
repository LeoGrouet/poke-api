const express = require("express");
const APIFetch = require("./client/controllers/apiCallController");

const router = express.Router();

router.get("/", APIFetch.allPokemon);
router.get("/pokemon/:order", APIFetch.onePokemonByNumber);
router.get("/types", APIFetch.getTypes);
router.get("/type/:type", APIFetch.getPokemonsOfOneType);

module.exports = router;
