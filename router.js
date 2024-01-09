const express = require("express");
const APIFetch = require("./client/controllers/apiCallController");
const playerControllers = require("./serveur/controllers/playerController");
const teamController = require("./client/controllers/teamControllers");
const loginController = require("./client/controllers/loginController");

const router = express.Router();

router.get("/", APIFetch.allPokemon);

router.get("/pokemon/:order", APIFetch.onePokemonByNumber);

router.get("/types", APIFetch.getTypes);

router.get("/type/:type", APIFetch.getPokemonsOfOneType);

router.get("/team", teamController.getMyTeam);

router.get("/add/:id", APIFetch.addPokemonToTeam);

router.get("/delete/:id", teamController.deletePokemonOfTeam);

router.get("/login", loginController.loginPage);

router.get("signin");

router.post("/player", playerControllers.newPlayer);

//router.patch("player/:id", playerControllers.updatePlayer);

module.exports = router;
