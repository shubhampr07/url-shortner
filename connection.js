const mongoose = require("mongoose");

async function dbConnection (url) {
    return mongoose.connect(url)
    .then(() => console.log("db connected"))
    .catch(() => console.log("error while connecting db"));
}

module.exports = {
    dbConnection,
}