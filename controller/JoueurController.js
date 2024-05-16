const Joueur = require("../model/Joueur");

const addJoueur = async (req, res) => {
  const joueur = new Joueur();

  const { pseudo } = req.body;
  if (!pseudo) {
    return res.status(400).json({ message: "Pseudo is required" });
  }

  joueur.sante = 100;
  joueur.score = 0;
  joueur.pseudo = pseudo;
  try {
    await joueur.save();
    res.status(201).json({ message: "Joueur saved successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save joueur", error: err.message });
  }
};

const getJoueur = async (req, res) => {
  try {
    const joueurs = await Joueur.find({});
    res.status(201).send(joueurs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getJouerById = async (req, res) => {
  try {
    const joueurs = await Joueur.find({ _id: req.params.id });
    res.status(201).send(joueurs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateJoueur = async (req, res) => {
  try {
    const joueurs = await Joueur.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!joueurs) {
      res.send(404).send("notFound");
    }
    res.status(201).send(joueurs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteJoueur = async (req, res) => {
  try {
    await Joueur.deleteOne({ _id: req.params.id });
    res.status(200).send("Joueur deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const attaque = async (req, res) => {
  try {
    const joueur = await Joueur.findById({ _id: req.params.idAttaquant });
    const joueur2 = await Joueur.findById({ _id: req.params.idVicitm });

    joueur.score = joueur.score + 10;
    joueur2.sante = joueur.sante - 20;

    joueur.save();
    joueur2.save();
    res.status(201).send("Joueur attaque succed");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  addJoueur,
  getJoueur,
  getJouerById,
  updateJoueur,
  deleteJoueur,
  attaque,
};
