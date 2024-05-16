const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./database/dbConnexion");
const JoueurRoute = require("./routes/JoueurRouter");
const PartieRoute = require("./routes/PartieRouter");
const http = require("http");
const path = require("path");
const Partie = require("./model/Partie");
const Joueur = require("./model/Joueur");
// const Joueur = require("./model/Joueur");
// const Partie = require("./model/Partie");

dotenv.config({ path: ".env" });
dbConnection();

/*  router */

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/joueur", JoueurRoute);
app.use("/partie", PartieRoute);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.get("/index", (req, res) => {
  res.render("index");
});

const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);
  socket.on("submitForm", async (game) => {
    try {
      const newPartie = new Partie({
        nom: game.name,
        joueur_1: game.joueur1,
        joueur_2: game.joueur2,
        etat: "en cours",
      });
      console.log(newPartie);
      await newPartie.save();
      io.emit("newGame", newPartie);
    } catch (error) {
      console.log("error saving new game", error.message);
      socket.emit("error", "Error saving new game.");
    }
    0;
  });

  socket.on("submitForm2", async (game) => {
    try {
      const partie = await Partie.findOne({ nom: game.name });
      console.log(partie , "this is the partie")
      const joueur1 = await Joueur.findById(game.joueur1);
      const joueur2 = await Joueur.findById(game.joueur2);

      io.emit("newGame2", { joueur1, joueur2,partie });
    } catch (error) {
      console.log("error stats", error.message);
      socket.emit("error", "Error stats.", error.message);
    }
    0;
  });
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
