const express = require("express");
const { addPartie } = require("../controller/PartieController");
const partieRoute = express.Router();

partieRoute.post("/addPartie/:idJoueur1/:idJoueur2", addPartie);

module.exports = partieRoute;
