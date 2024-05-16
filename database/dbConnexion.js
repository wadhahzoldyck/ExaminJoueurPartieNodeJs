const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.mongo_url)
    .then((conn) => {
      console.log(`DataBase Connected : ${conn.connection.host}`);
    })
    .catch((err) => console.log(err));
};
module.exports = dbConnection;