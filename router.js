const express = require("express");
const APIFetch = require("./client/controllers/apiCallController");
const playerController = require("./serveur/controllers/playerController");
const teamController = require("./client/controllers/teamControllers");
const registerController = require("./client/controllers/registerController.js");
const gamesController = require("./client/controllers/gamesController");

const router = express.Router();

router.get("/", APIFetch.allPokemon);

router.get("/pokemon/:order", APIFetch.onePokemonByNumber);

router.get("/types", APIFetch.getTypes);

router.get("/type/:type", APIFetch.getPokemonsOfOneType);

router.get("/team", teamController.getMyTeam);

router.get("/add/:id", teamController.addPokemonToTeam);

router.get("/delete/:id", teamController.deletePokemonOfTeam);

router.get("/games", gamesController.whosThePokemon);

router.get("/login", registerController.login);
router.post("/login", registerController.loginPost);

router.get("/signup", registerController.signup);
router.post("/signup", registerController.signupPost);

module.exports = router;
