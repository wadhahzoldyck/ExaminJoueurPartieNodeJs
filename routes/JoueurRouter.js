const express = require("express");
const {
  addJoueur,
  getJoueur,
  getJouerById,
  updateJoueur,
  deleteJoueur,
  attaque,
} = require("../controller/JoueurController");
const joueurRouter = express.Router();

joueurRouter.post("/newjoueur", addJoueur);
joueurRouter.get("", getJoueur);
joueurRouter.get("/:id", getJouerById);
joueurRouter.patch("/joueur/:id", updateJoueur);
joueurRouter.delete("/:id", deleteJoueur);
joueurRouter.put("/:idAttaquant/:idVicitm", attaque);


module.exports = joueurRouter;
