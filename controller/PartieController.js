const Partie = require("../model/Partie");
const Joueur = require("../model/Joueur");

const addPartie = async (req, res) => {
  const partie = new Partie();
  //   const joueur1 = await Joueur.findById({ _id: req.params.idAttaquant });
  //   const joueur2 = await Joueur.findById({ _id: req.params.idVicitm });

  try {
    (partie.nom = req.body.nom),
      (partie.joueur_1 = req.params.idJoueur1),
      (partie.joueur_2 = req.params.idJoueur2),
      (partie.etat = "en cours");
    await partie.save();
    res.status(201).json({ message: "Partie saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save joueur", error: error.message });
  }
};

module.exports = {
  addPartie,
};
