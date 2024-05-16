const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./database/dbConnexion");
// const JoueurRoute = require("./route/JoueurRoutes");
// const PartieRoute = require("./route/PartieRoutes");
const http = require("http");
const path = require("path");
// const Joueur = require("./model/Joueur");
// const Partie = require("./model/Partie");

dotenv.config({ path: ".env" });

dbConnection();

const app = express();