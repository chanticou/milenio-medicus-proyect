const sql = require("mssql");
require("dotenv").config();

const dbSettings = {
  user: process.env.user,
  password: process.env.password,
  server: "localhost",
  database: "webStore",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getConnection;
